import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomCard from '../../shared/CustomCard';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { formatDate, getDaysRemaining, getStatusFromDays, getStatusColorName } from '../../../utils/dateUtils';

const TimelineItem = ({ item, maintenance, onPress }) => {
    const daysLeft = getDaysRemaining(item.expiryDate);
    const status = getStatusFromDays(daysLeft);
    const statusColorName = getStatusColorName(status);
    const statusColor = Colors[statusColorName] || Colors.textSecondary;

    return (
        <CustomCard
            title={item.name}
            subtitle={`Expires: ${formatDate(item.expiryDate)}`}
            rightText={`${daysLeft} days`}
            statusColor={statusColor}
            onPress={onPress}
            image={item.image} // Passing image prop
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
