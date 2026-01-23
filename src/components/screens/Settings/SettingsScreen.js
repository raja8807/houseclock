import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import CustomHeader from '../../shared/CustomHeader';
import CustomButton from '../../shared/CustomButton';
import ProfileSection from './ProfileSection';
import DataSection from './DataSection';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <CustomHeader title="Settings" />
            <View style={styles.content}>

                <ProfileSection />

                {/* Home Info - Could potentially be extracted too, but leaving inline for variety/simplicity if small */}
                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionTitle]}>Home</Text>
                    <View style={styles.row}>
                        <Text style={Typography.body}>Apartment (Renter)</Text>
                        <Text style={[Typography.caption, { color: Colors.primary }]}>Edit</Text>
                    </View>
                </View>

                <DataSection />

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
    spacer: {
        flex: 1,
    },
    version: {
        textAlign: 'center',
        marginTop: Spacing.l,
    },
});

export default SettingsScreen;
