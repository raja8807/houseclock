import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import { formatDate } from '../../../utils/dateUtils';
import TimelineItem from './TimelineItem';
import TileItem from './TileItem';
import { useFetchItems } from '../../../services/api_hooks/item_hooks';
import { useFetchProperties, useAddProperty } from '../../../services/api_hooks/property_hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../../shared/CustomButton';
import { useProperty } from '../../../context/PropertyContext';

const DashboardScreen = ({ navigation }) => {
    const today = new Date();
    const [isGridView, setIsGridView] = useState(false);
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showAddProperty, setShowAddProperty] = useState(false);
    const [newPropertyName, setNewPropertyName] = useState('');

    // Properties
    const { data: properties = [] } = useFetchProperties();
    const { mutateAsync: addProperty, isPending: isAddingProperty } = useAddProperty();

    const { currentProperty, switchProperty } = useProperty();

    // Fetch Items (now includes nested maintenance tasks)
    const {
        data: items = [],
        isLoading,
        refetch
    } = useFetchItems(currentProperty?.id);

    const handleAddProperty = async () => {
        if (!newPropertyName.trim()) return;
        await addProperty({ name: newPropertyName, type: 'House' });
        setNewPropertyName('');
        setShowAddProperty(false);
        // Maybe auto-select the new property?
    };

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
                <TouchableOpacity onPress={() => setShowPropertyModal(true)}>
                    <View>
                        <Text style={[Typography.caption, styles.date, { marginTop: 0 }]}>{formatDate(today)}</Text>
                        <View style={styles.selectorRow}>
                            <Text style={[Typography.title, styles.greeting]}>
                                {currentProperty?.name || 'Loading...'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color={Colors.primary} style={{ marginLeft: 4 }} />
                        </View>
                    </View>
                </TouchableOpacity>

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

            {/* Property Selector Modal */}
            <Modal
                visible={showPropertyModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowPropertyModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowPropertyModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={[Typography.subtitle, styles.modalTitle]}>Select Property</Text>
                        {properties.map(prop => (
                            <TouchableOpacity
                                key={prop.id}
                                style={[
                                    styles.propertyOption,
                                    currentProperty?.id === prop.id && styles.selectedProperty
                                ]}
                                onPress={() => {
                                    switchProperty(prop);
                                    setShowPropertyModal(false);
                                }}
                            >
                                <Text style={[
                                    styles.propertyOptionText,
                                    currentProperty?.id === prop.id && styles.selectedPropertyText
                                ]}>
                                    {prop.name}
                                </Text>
                                {currentProperty?.id === prop.id && (
                                    <Ionicons name="checkmark" size={20} color={Colors.primary} />
                                )}
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.addPropertyOption}
                            onPress={() => {
                                setShowPropertyModal(false);
                                setShowAddProperty(true);
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
                            <Text style={styles.addPropertyText}>Add New Property</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Add Property Modal */}
            <Modal
                visible={showAddProperty}
                transparent
                animationType="slide"
                onRequestClose={() => setShowAddProperty(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.addPropContent}>
                        <Text style={[Typography.subtitle, styles.modalTitle]}>Add New Property</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Property Name (e.g. Vacation Home)"
                            value={newPropertyName}
                            onChangeText={setNewPropertyName}
                            autoFocus
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={() => setShowAddProperty(false)} style={styles.modalCancel}>
                                <Text style={{ color: Colors.textSecondary }}>Cancel</Text>
                            </TouchableOpacity>
                            <CustomButton
                                title={isAddingProperty ? "Adding..." : "Add"}
                                onPress={handleAddProperty}
                                style={{ width: 100 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

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
    selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.l,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: Spacing.m,
        textAlign: 'center',
    },
    propertyOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    selectedProperty: {
        backgroundColor: '#F0F9FF', // Light blue tint
        marginHorizontal: -Spacing.l,
        paddingHorizontal: Spacing.l,
    },
    propertyOptionText: {
        fontSize: 16,
        color: Colors.text,
    },
    selectedPropertyText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    addPropertyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.m,
        marginTop: Spacing.s,
    },
    addPropertyText: {
        marginLeft: Spacing.s,
        color: Colors.primary,
        fontWeight: '500',
    },
    addPropContent: {
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.l,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: Spacing.m,
        fontSize: 16,
        marginBottom: Spacing.l,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: Spacing.l,
    },
    modalCancel: {
        padding: Spacing.s,
    },
});

export default DashboardScreen;
