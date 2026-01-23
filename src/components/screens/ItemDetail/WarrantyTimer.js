import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';

import { getStatusFromDays, getStatusColorName } from '../../../utils/dateUtils';

const WarrantyTimer = ({ daysLeft }) => {
    const status = getStatusFromDays(daysLeft);
    const colorName = getStatusColorName(status);
    const color = Colors[colorName] || Colors.primary;

    return (
        <View style={styles.timerContainer}>
            <Text style={[styles.timerValue, { color }]}>{daysLeft} Days</Text>
            <Text style={styles.timerLabel}>Until Warranty Expires</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
        // color set dynamically
    },
    timerLabel: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
});

export default WarrantyTimer;
