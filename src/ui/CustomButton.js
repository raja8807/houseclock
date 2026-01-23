import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';

const CustomButton = ({ title, onPress, type = 'primary', disabled = false }) => {
    const getBackgroundColor = () => {
        if (disabled) return Colors.border;
        if (type === 'danger') return Colors.danger;
        if (type === 'secondary') return 'transparent';
        return Colors.primary;
    };

    const getTextColor = () => {
        if (disabled) return Colors.textSecondary;
        if (type === 'secondary') return Colors.primary;
        return Colors.white;
    };

    const getBorderColor = () => {
        if (type === 'secondary') return Colors.primary;
        return 'transparent';
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: type === 'secondary' ? 1 : 0,
                },
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 48,
        borderRadius: Spacing.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Spacing.s,
        width: '100%',
    },
    text: {
        ...Typography.body,
        fontWeight: '600',
    },
});

export default CustomButton;
