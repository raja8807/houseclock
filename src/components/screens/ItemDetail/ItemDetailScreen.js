import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import CustomHeader from '../../shared/CustomHeader';
import CustomButton from '../../shared/CustomButton';
import { formatDate, getDaysRemaining } from '../../../utils/dateUtils';
import DetailRow from './DetailRow';
import WarrantyTimer from './WarrantyTimer';
import { useDeleteItem, useFetchItems } from '../../../services/api_hooks/item_hooks';
import { useDeleteMaintenance } from '../../../services/api_hooks/maintenance_hooks';
import Ionicons from '@expo/vector-icons/Ionicons';

const ItemDetailScreen = ({ route, navigation }) => {
    // Get item from params (initial state)
    const { item: initialItem } = route.params;

    // Get live data to ensure updates show immediately
    const { data: items = [] } = useFetchItems();
    const item = items.find(i => i.id === initialItem.id) || initialItem;

    const daysLeft = getDaysRemaining(item.expiryDate);
    const itemTasks = item.maintenanceTasks || [];

    const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteItem();

    const handleDelete = () => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteItem(item.id);
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete item.');
                            console.error(error);
                        }
                    }
                },
            ]
        );
    };

    const { mutateAsync: deleteMaintenance } = useDeleteMaintenance();

    const handleTaskDelete = (taskId) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this maintenance task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteMaintenance({ itemId: item.id, taskId });
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete task.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader
                title="Item Details"
                showBack
                rightIcon="pencil"
                onRightPress={() => navigation.navigate('AddItem', { item })}
            />
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header Card */}
                <View style={styles.card}>
                    {item.image && (
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                    )}
                    <Text style={[Typography.title, styles.title]}>{item.name}</Text>
                    <Text style={[Typography.body, styles.subtitle]}>{item.category}</Text>
                    <WarrantyTimer daysLeft={daysLeft} />
                </View>

                {/* Details Section */}
                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionTitle]}>Information</Text>
                    <DetailRow label="Purchase Date" value={formatDate(item.purchaseDate)} />
                    <DetailRow label="Warranty Duration" value={`${item.warrantyDuration} Months`} />
                    <DetailRow label="Warranty Expiry" value={formatDate(item.expiryDate)} />
                    <DetailRow label="Return Window" value={item.returnWindow} />
                </View>

                {/* Maintenance Section */}
                {itemTasks.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[Typography.subtitle, styles.sectionTitle]}>Scheduled Maintenance</Text>
                        {itemTasks.map(task => (
                            <View key={task.id} style={styles.taskCard}>
                                <View style={styles.taskHeader}>
                                    <View style={styles.taskTitleContainer}>
                                        <Text style={styles.taskTitle}>{task.title}</Text>
                                        <Text style={styles.taskFreq}>{task.frequency}</Text>
                                    </View>
                                    <View style={styles.iconActions}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('AddMaintenance', { item, task })}
                                            style={styles.iconButton}
                                        >
                                            <Ionicons name="pencil-outline" size={20} color={Colors.primary} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleTaskDelete(task.id)}
                                            style={styles.iconButton}
                                        >
                                            <Ionicons name="trash-outline" size={20} color={Colors.error || '#DC2626'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.taskFooter}>
                                    <Text style={styles.taskDate}>Next Due: {formatDate(task.nextDue)}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Actions */}
                <View style={styles.actions}>
                    <CustomButton
                        title="Schedule Maintenance"
                        type="primary"
                        onPress={() => navigation.navigate('AddMaintenance', { item })}
                    />
                    <CustomButton
                        title={isDeleting ? "Deleting..." : "Delete Item"}
                        type="danger"
                        onPress={handleDelete}
                        disabled={isDeleting}
                    />
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: Spacing.screenPadding,
        paddingBottom: Spacing.xxl,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.l,
        marginBottom: Spacing.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden', // Handle image overflow
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: Spacing.borderRadius - 4, // Inner radius
        marginBottom: Spacing.m,
        resizeMode: 'cover',
    },
    title: {
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        color: Colors.textSecondary,
        marginBottom: Spacing.l,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
    },
    taskCard: {
        backgroundColor: Colors.white,
        padding: Spacing.m,
        borderRadius: Spacing.borderRadius,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: Spacing.s,
    },
    taskTitle: {
        fontWeight: '500',
        color: Colors.text,
        marginBottom: 2,
    },
    taskFreq: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    taskDate: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '500',
    },
    actions: {
        gap: Spacing.m,
        marginTop: Spacing.l,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.xs,
    },
    taskTitleContainer: {
        flex: 1,
        marginRight: Spacing.s,
    },
    iconActions: {
        flexDirection: 'row',
        gap: Spacing.s,
    },
    iconButton: {
        padding: 4,
    },
    taskFooter: {
        // Date on right, or flex-start if preferred. Using flex-end as it feels cleaner below icons
        marginTop: Spacing.s,
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        paddingTop: Spacing.s,
    },
});

export default ItemDetailScreen;
