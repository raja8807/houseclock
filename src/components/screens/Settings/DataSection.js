import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';

const DataSection = () => {
    return (
        <View style={styles.section}>
            <Text style={[Typography.subtitle, styles.sectionTitle]}>Data</Text>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={Typography.body}>Export Data (CSV)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={Typography.body}>Clear Cache</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
        color: Colors.text,
    },
    menuItem: {
        paddingVertical: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
});

export default DataSection;
