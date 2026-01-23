import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';

const ProfileSection = () => {
    return (
        <View style={styles.profileSection}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.profileInfo}>
                <Text style={Typography.subtitle}>Alex Doe</Text>
                <Text style={Typography.body}>alex@example.com</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        paddingBottom: Spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.m,
    },
    avatarText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileInfo: {
        justifyContent: 'center',
    },
});

export default ProfileSection;
