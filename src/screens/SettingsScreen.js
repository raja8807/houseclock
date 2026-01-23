import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';
import CustomHeader from '../ui/CustomHeader';
import CustomButton from '../ui/CustomButton';


const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <CustomHeader title="Settings" />
            <View style={styles.content}>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={Typography.subtitle}>Alex Doe</Text>
                        <Text style={Typography.body}>alex@example.com</Text>
                    </View>
                </View>

                {/* Home Info */}
                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionTitle]}>Home</Text>
                    <View style={styles.row}>
                        <Text style={Typography.body}>Apartment (Renter)</Text>
                        <Text style={[Typography.caption, { color: Colors.primary }]}>Edit</Text>
                    </View>
                </View>

                {/* Data Options */}
                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionTitle]}>Data</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={Typography.body}>Export Data (CSV)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={Typography.body}>Clear Cache</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.spacer} />

                <CustomButton
                    title="Log Out"
                    type="danger"
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })}
                />

                <Text style={[Typography.caption, styles.version]}>v1.0.0 (MVP)</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: Spacing.screenPadding,
        flex: 1,
    },
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
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
        color: Colors.text,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.s,
    },
    menuItem: {
        paddingVertical: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    spacer: {
        flex: 1,
    },
    version: {
        textAlign: 'center',
        marginTop: Spacing.l,
    },
});

export default SettingsScreen;
