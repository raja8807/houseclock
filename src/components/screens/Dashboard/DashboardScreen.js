import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import { dummyItems } from '../../../data/dummyItems';
import { dummyMaintenance } from '../../../data/dummyMaintenance';
import { formatDate } from '../../../utils/dateUtils';
import TimelineItem from './TimelineItem';

const DashboardScreen = ({ navigation }) => {
    const today = new Date();
    const greeting = 'Good Morning, Alex';

    const getMaintenanceForItem = (itemId) => {
        return dummyMaintenance.find(m => m.itemId === itemId);
    };

    const renderItem = ({ item }) => {
        const maintenance = getMaintenanceForItem(item.id);
        return (
            <TimelineItem
                item={item}
                maintenance={maintenance}
                onPress={() => navigation.navigate('ItemDetail', { item })}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={[Typography.title, styles.greeting]}>{greeting}</Text>
                <Text style={[Typography.body, styles.date]}>{formatDate(today)}</Text>
            </View>

            <FlatList
                data={dummyItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={[Typography.subtitle, styles.sectionTitle]}>Timeline</Text>}
            />

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
    },
    greeting: {
        color: Colors.primary,
    },
    date: {
        color: Colors.textSecondary,
        marginTop: 4,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
        marginLeft: Spacing.xs,
    },
    listContent: {
        padding: Spacing.screenPadding,
        paddingTop: Spacing.s,
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
});

export default DashboardScreen;
