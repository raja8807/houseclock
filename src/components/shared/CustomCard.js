import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';

const CustomCard = ({
    title,
    subtitle,
    rightText,
    statusColor,
    onPress,
    children,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, { borderLeftColor: statusColor || 'transparent', borderLeftWidth: statusColor ? 4 : 0 }]}
            onPress={onPress}
            disabled={!onPress}
            activeOpacity={0.7}
        >
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={[Typography.subtitle, styles.title]} numberOfLines={1}>{title}</Text>
                    {subtitle && (
                        <Text style={[Typography.caption, styles.subtitle]} numberOfLines={1}>
                            {subtitle}
                        </Text>
                    )}
                </View>
                {rightText && (
                    <View style={styles.rightContainer}>
                        <Text style={[Typography.caption, styles.rightText]}>{rightText}</Text>
                    </View>
                )}
            </View>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.m,
        marginBottom: Spacing.m,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: Spacing.s,
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
    },
    subtitle: {
        color: Colors.textSecondary,
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    rightText: {
        fontWeight: '500',
        color: Colors.textSecondary,
    },
});

export default CustomCard;
