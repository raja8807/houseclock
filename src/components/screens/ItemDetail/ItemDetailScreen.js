import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import CustomHeader from '../../shared/CustomHeader';
import CustomButton from '../../shared/CustomButton';
import { formatDate, getDaysRemaining } from '../../../utils/dateUtils';
import DetailRow from './DetailRow';
import WarrantyTimer from './WarrantyTimer';

const ItemDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const daysLeft = getDaysRemaining(item.expiryDate);

    const handleDelete = () => {
        console.log('Delete item:', item.id);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Item Details" showBack />
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header Card */}
                <View style={styles.card}>
                    <Text style={[Typography.title, styles.title]}>{item.name}</Text>
                    <Text style={[Typography.body, styles.subtitle]}>{item.category}</Text>
                    <WarrantyTimer daysLeft={daysLeft} />
                </View>

                {/* Details Section */}
                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionTitle]}>Information</Text>
                    <DetailRow label="Purchase Date" value={formatDate(item.purchaseDate)} />
                    <DetailRow label="Warranty Duration" value={item.warrantyDuration} />
                    <DetailRow label="Warranty Expiry" value={formatDate(item.expiryDate)} />
                    <DetailRow label="Return Window" value={item.returnWindow} />
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <CustomButton
                        title="Schedule Maintenance"
                        type="primary"
                        onPress={() => navigation.navigate('AddMaintenance', { item })}
                    />
                    <CustomButton
                        title="Edit Item"
                        type="secondary"
                        onPress={() => console.log('Edit clicked')}
                    />
                    <CustomButton
                        title="Delete Item"
                        type="danger"
                        onPress={handleDelete}
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
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.l,
        marginBottom: Spacing.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
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
        marginBottom: Spacing.xxl,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
    },
    actions: {
        gap: Spacing.m,
    },
});

export default ItemDetailScreen;
