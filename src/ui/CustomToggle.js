import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';

const CustomToggle = ({ label, value, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Text style={[Typography.body, styles.label]}>{label}</Text>
            <Switch
                trackColor={{ false: Colors.border, true: Colors.success }}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.border}
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    label: {
        flex: 1,
        color: Colors.text,
    },
});

export default CustomToggle;
