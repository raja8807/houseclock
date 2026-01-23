import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType,
    multiline,
    numberOfLines,
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, Typography.label]}>{label}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.l,
    },
    label: {
        marginBottom: Spacing.s,
        color: Colors.textSecondary,
    },
    input: {
        backgroundColor: Colors.inputBackground,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.m,
        color: Colors.text,
        fontSize: Typography.body.fontSize,
        minHeight: 48, // Touch target
    },
});

export default CustomInput;
