import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';
import CustomButton from '../ui/CustomButton';

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoPlaceholder}>
                    <Text style={styles.logoText}>HC</Text>
                </View>
                <Text style={[Typography.title, styles.title]}>Houseclock</Text>
                <Text style={[Typography.body, styles.tagline]}>
                    Calm, reliable, and quietly saving me from future regret.
                </Text>
            </View>
            <View style={styles.footer}>
                <CustomButton
                    title="Continue"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.screenPadding,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    logoText: {
        color: Colors.white,
        fontSize: 40,
        fontWeight: 'bold',
    },
    title: {
        color: Colors.primary,
        marginBottom: Spacing.m,
    },
    tagline: {
        textAlign: 'center',
        color: Colors.textSecondary,
        paddingHorizontal: Spacing.l,
    },
    footer: {
        marginBottom: Spacing.xxl,
    },
});

export default SplashScreen;
