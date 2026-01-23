import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';
import CustomToggle from '../ui/CustomToggle';
import CustomHeader from '../ui/CustomHeader';
import { dummyReminders } from '../data/dummyReminders';

const RemindersScreen = () => {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [reminders, setReminders] = useState(dummyReminders);

    const toggleReminder = (id) => {
        setReminders((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, enabled: !item.enabled } : item
            )
        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Reminders" />
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionHeader]}>Global Settings</Text>
                    <CustomToggle
                        label="Push Notifications"
                        value={pushEnabled}
                        onValueChange={setPushEnabled}
                    />
                    <CustomToggle
                        label="Email Alerts"
                        value={emailEnabled}
                        onValueChange={setEmailEnabled}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[Typography.subtitle, styles.sectionHeader]}>Alert Types</Text>
                    <FlatList
                        data={reminders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CustomToggle
                                label={item.title}
                                value={item.enabled}
                                onValueChange={() => toggleReminder(item.id)}
                            />
                        )}
                        scrollEnabled={false}
                    />
                </View>
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
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionHeader: {
        marginBottom: Spacing.s,
        color: Colors.primary,
    },
});

export default RemindersScreen;
