import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSendOtp = () => {
        // Mock login logic
        console.log('OTP Sent to:', email);
        navigation.navigate('HomeSetup');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <Text style={[Typography.title, styles.title]}>Welcome Back</Text>
                    <Text style={[Typography.body, styles.subtitle]}>
                        Enter your email to sync your home.
                    </Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        label="Email Address"
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Send OTP"
                            onPress={handleSendOtp}
                            disabled={!email}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
        padding: Spacing.screenPadding,
    },
    header: {
        marginTop: Spacing.xxl,
        marginBottom: Spacing.xxl,
    },
    title: {
        color: Colors.primary,
        marginBottom: Spacing.s,
    },
    subtitle: {
        color: Colors.textSecondary,
    },
    form: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: Spacing.l,
    },
});

export default LoginScreen;
