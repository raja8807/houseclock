import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import { formatDate } from '../../../utils/dateUtils';
import TimelineItem from './TimelineItem';
import TileItem from './TileItem';
import { useFetchItems } from '../../../services/api_hooks/item_hooks';
import Ionicons from '@expo/vector-icons/Ionicons';

const DashboardScreen = ({ navigation }) => {
    const today = new Date();
    const greeting = 'Good Morning, Alex';
    const [isGridView, setIsGridView] = useState(false);

    // Fetch Items (now includes nested maintenance tasks)
    const {
        data: items = [],
        isLoading,
        refetch
    } = useFetchItems();

    const onRefresh = () => {
        refetch();
    };

    const getUrgentMaintenance = (item) => {
        const tasks = item.maintenanceTasks || [];
        if (tasks.length === 0) return null;

        // Sort by nextDue date (earliest first)
        return [...tasks].sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue))[0];
    };

    const renderItem = ({ item }) => {
        if (isGridView) {
            return <TileItem item={item} onPress={() => navigation.navigate('ItemDetail', { item })} />;
        }

        const urgentTask = getUrgentMaintenance(item);
        return (
            <TimelineItem
                item={item}
                maintenance={urgentTask}
                onPress={() => navigation.navigate('ItemDetail', { item })}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={[Typography.title, styles.greeting]}>{greeting}</Text>
                    <Text style={[Typography.body, styles.date]}>{formatDate(today)}</Text>
                </View>
                <TouchableOpacity onPress={() => setIsGridView(!isGridView)} style={styles.viewToggle}>
                    <Ionicons
                        name={isGridView ? "list-outline" : "grid-outline"}
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>Updating Houseclock...</Text>
                </View>
            ) : (
                <FlatList
                    key={isGridView ? 'grid' : 'list'} // Unique key to force re-render on layout change
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    numColumns={isGridView ? 2 : 1}
                    columnWrapperStyle={isGridView ? styles.columnWrapper : null}
                    ListHeaderComponent={<Text style={[Typography.subtitle, styles.sectionTitle]}>Timeline</Text>}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={[Colors.primary]} />
                    }
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddItem')}
                activeOpacity={0.8}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: Spacing.screenPadding,
        paddingVertical: Spacing.l,
        backgroundColor: Colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        color: Colors.primary,
    },
    date: {
        color: Colors.textSecondary,
        marginTop: 4,
    },
    viewToggle: {
        padding: Spacing.s,
        backgroundColor: Colors.white,
        borderRadius: 8,
        elevation: 1,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
        marginLeft: Spacing.xs,
        marginTop: Spacing.s,
    },
    listContent: {
        padding: Spacing.screenPadding,
        paddingTop: Spacing.s,
        paddingBottom: 100, // Space for FAB
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    fab: {
        position: 'absolute',
        bottom: Spacing.xxl + 20,
        right: Spacing.screenPadding,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabIcon: {
        color: Colors.white,
        fontSize: 32,
        marginTop: -4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: Spacing.m,
        color: Colors.textSecondary,
    },
});

export default DashboardScreen;
