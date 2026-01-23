import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';
import CustomHeader from '../ui/CustomHeader';
import CustomButton from '../ui/CustomButton';
import { formatDate, getDaysRemaining } from '../utils/dateUtils';

const DetailRow = ({ label, value, highlight }) => (
    <View style={styles.row}>
        <Text style={[Typography.body, styles.label]}>{label}</Text>
        <Text style={[Typography.body, styles.value, highlight && styles.highlight]}>
            {value || 'N/A'}
        </Text>
    </View>
);

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

                    <View style={styles.timerContainer}>
                        <Text style={styles.timerValue}>{daysLeft} Days</Text>
                        <Text style={styles.timerLabel}>Until Warranty Expires</Text>
                    </View>
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
    timerContainer: {
        backgroundColor: Colors.background,
        padding: Spacing.m,
        borderRadius: Spacing.borderRadius,
        alignItems: 'center',
        width: '100%',
    },
    timerValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    timerLabel: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    section: {
        marginBottom: Spacing.xxl,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.s,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    label: {
        color: Colors.textSecondary,
    },
    value: {
        fontWeight: '500',
    },
    highlight: {
        color: Colors.primary,
    },
    actions: {
        gap: Spacing.m,
    },
});

export default ItemDetailScreen;
