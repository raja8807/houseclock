import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import CustomSelectBox from '../../shared/CustomSelectBox';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import CustomHeader from '../../shared/CustomHeader';

const AddMaintenanceScreen = ({ navigation }) => {
    const [task, setTask] = useState('');
    const [frequency, setFrequency] = useState('');
    const [nextDue, setNextDue] = useState('');

    const taskOptions = [
        { label: 'Clean AC Filters', value: 'ac_filters' },
        { label: 'Check Smoke Alarms', value: 'smoke_alarms' },
        { label: 'Descale Coffee Machine', value: 'coffee_descale' },
        { label: 'Custom Task', value: 'custom' },
    ];

    const frequencyOptions = [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Yearly', value: 'yearly' },
    ];

    const handleSave = () => {
        console.log('Saving maintenance:', { task, frequency, nextDue });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Add Maintenance" showBack />
            <ScrollView contentContainerStyle={styles.content}>

                <CustomSelectBox
                    label="Select Task"
                    options={taskOptions}
                    selectedValue={task}
                    onSelect={setTask}
                />

                {task === 'custom' && (
                    <CustomInput
                        label="Task Name"
                        placeholder="Enter task name"
                        value={task} // In real app would be separate state
                        onChangeText={() => { }}
                    />
                )}

                <CustomSelectBox
                    label="Frequency"
                    options={frequencyOptions}
                    selectedValue={frequency}
                    onSelect={setFrequency}
                />

                <CustomInput
                    label="Next Due Date"
                    placeholder="YYYY-MM-DD"
                    value={nextDue}
                    onChangeText={setNextDue}
                />

                <View style={styles.footer}>
                    <CustomButton
                        title="Schedule Task"
                        onPress={handleSave}
                        disabled={!task || !frequency}
                    />
                </View>

            </ScrollView>
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
    footer: {
        marginTop: Spacing.xl,
    },
});

export default AddMaintenanceScreen;
