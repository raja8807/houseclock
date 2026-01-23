import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import { getDaysRemaining, getStatusFromDays, getStatusColorName } from '../../../utils/dateUtils';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const gap = Spacing.screenPadding;
const itemWidth = (width - (Spacing.screenPadding * 3)) / 2; // 2 items per row with padding

const TileItem = ({ item, onPress }) => {
    const daysLeft = getDaysRemaining(item.expiryDate);
    const status = getStatusFromDays(daysLeft);
    const statusColorName = getStatusColorName(status);
    const statusColor = Colors[statusColorName] || Colors.textSecondary;

    return (
        <TouchableOpacity
            style={[styles.container, { borderColor: statusColor }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Ionicons name="image-outline" size={32} color={Colors.textSecondary} />
                    </View>
                )}
                <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>{daysLeft}d</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={[Typography.subtitle, styles.title]} numberOfLines={1}>{item.name}</Text>
                <Text style={[Typography.caption, styles.subtitle]} numberOfLines={1}>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        marginBottom: Spacing.m,
        overflow: 'hidden',
        borderWidth: 1,
        borderBottomWidth: 3, // Accentuate status color
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        height: 100,
        width: '100%',
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
    },
    textContainer: {
        padding: Spacing.s,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    subtitle: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    statusBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default TileItem;
