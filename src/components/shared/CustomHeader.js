import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomHeader = ({ title, showBack = false, rightElement, ...props }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {showBack && (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backText}>←</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, Typography.subtitle]}>{title}</Text>
                </View>
                <View style={styles.rightContainer}>
                    {rightElement}
                    {!rightElement && props.rightIcon && (
                        <TouchableOpacity onPress={props.onRightPress} style={styles.rightButton}>
                            <Ionicons name={props.rightIcon} size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.screenPadding,
    },
    leftContainer: {
        width: 40,
        alignItems: 'flex-start',
    },
    backButton: {
        padding: Spacing.s,
    },
    backText: {
        fontSize: 24,
        color: Colors.text,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    rightContainer: {
        width: 40,
        alignItems: 'flex-end',
    },
    rightButton: {
        padding: Spacing.s,
    },
});

export default CustomHeader;
