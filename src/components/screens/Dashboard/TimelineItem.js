import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomCard from '../../shared/CustomCard';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { formatDate, getDaysRemaining } from '../../../utils/dateUtils';

const TimelineItem = ({ item, maintenance, onPress }) => {
    const daysLeft = getDaysRemaining(item.expiryDate);
    const status = item.status;

    // Map status string to Color
    let statusColor = Colors.success;
    if (status === 'urgent') statusColor = Colors.danger;
    if (status === 'upcoming') statusColor = Colors.accent;

    return (
        <CustomCard
            title={item.name}
            subtitle={`Expires: ${formatDate(item.expiryDate)}`}
            rightText={`${daysLeft} days`}
            statusColor={statusColor}
            onPress={onPress}
        >
            {maintenance && (
                <View style={styles.maintenanceContainer}>
                    <Text style={[Typography.caption, styles.maintenanceTitle]}>
                        🔧 {maintenance.title}
                    </Text>
                    <Text style={[Typography.caption, styles.maintenanceDate]}>
                        Due: {formatDate(maintenance.nextDue)}
                    </Text>
                </View>
            )}
        </CustomCard>
    );
};

const styles = StyleSheet.create({
    maintenanceContainer: {
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    maintenanceTitle: {
        color: Colors.text,
        fontWeight: '500',
    },
    maintenanceDate: {
        color: Colors.textSecondary,
    },
});

export default TimelineItem;
