import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';

const WarrantyTimer = ({ daysLeft }) => {
    return (
        <View style={styles.timerContainer}>
            <Text style={styles.timerValue}>{daysLeft} Days</Text>
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
        color: Colors.primary,
    },
    timerLabel: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
});

export default WarrantyTimer;
