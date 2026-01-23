import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';

const DetailRow = ({ label, value, highlight }) => (
    <View style={styles.row}>
        <Text style={[Typography.body, styles.label]}>{label}</Text>
        <Text style={[Typography.body, styles.value, highlight && styles.highlight]}>
            {value || 'N/A'}
        </Text>
    </View>
);

const styles = StyleSheet.create({
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
});

export default DetailRow;
