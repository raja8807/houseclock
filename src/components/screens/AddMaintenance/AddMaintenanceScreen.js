import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import CustomSelectBox from '../../shared/CustomSelectBox';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import CustomHeader from '../../shared/CustomHeader';
import CustomDatePicker from '../../shared/CustomDatePicker';
import { useAddMaintenance, useEditMaintenance } from '../../../services/api_hooks/maintenance_hooks';

const AddMaintenanceScreen = ({ navigation, route }) => {
    // If we came from an item, we have the item object
    // If we're editing, we have the task object
    const { item, task: editingTask } = route.params || {};

    const [task, setTask] = useState(editingTask?.title || '');
    const [frequency, setFrequency] = useState(editingTask?.frequency || '');
    const [nextDue, setNextDue] = useState(editingTask?.nextDue || '');

    const taskOptions = [
        { label: 'Replace AC Filter', value: 'replace_ac_filter' },
        { label: 'Test Smoke & CO Alarms', value: 'test_alarms' },
        { label: 'Flush Water Heater', value: 'flush_water_heater' },
        { label: 'Clean Dryer Vent', value: 'clean_dryer_vent' },
        { label: 'Replace Refrigerator Water Filter', value: 'replace_fridge_filter' },
        { label: 'Pest Control Service', value: 'pest_control' },
        { label: 'Custom Task', value: 'custom' },
    ];

    const frequencyOptions = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Yearly', value: 'Yearly' },
    ];

    const { mutateAsync: addMaintenance, isPending: isAdding } = useAddMaintenance();
    const { mutateAsync: editMaintenance, isPending: isEditing } = useEditMaintenance();

    const isPending = isAdding || isEditing;
    const isEditMode = !!editingTask;

    const handleSave = async () => {
        if (!task || !frequency || !nextDue) {
            Alert.alert('Missing Fields', 'Please fill in all fields.');
            return;
        }

        const taskTitle = task === 'custom' ? 'Custom Task' : (taskOptions.find(t => t.value === task)?.label || task);
        const taskFrequency = frequencyOptions.find(f => f.value === frequency)?.label || frequency;

        try {
            if (isEditMode) {
                const updatedTask = {
                    ...editingTask,
                    title: taskTitle,
                    frequency: taskFrequency,
                    nextDue,
                };
                await editMaintenance(updatedTask);
            } else {
                const newTask = {
                    itemId: item?.id,
                    title: taskTitle,
                    frequency: taskFrequency,
                    nextDue,
                    lastDone: 'N/A',
                };
                await addMaintenance(newTask);
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', isEditMode ? 'Failed to update task.' : 'Failed to schedule maintenance.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={isEditMode ? "Edit Maintenance" : "Schedule Maintenance"} showBack />
            <ScrollView contentContainerStyle={styles.content}>

                <CustomSelectBox
                    label="Select Task"
                    options={taskOptions}
                    selectedValue={
                        taskOptions.find(t => t.value === task)?.value ||
                        taskOptions.find(t => t.label === task)?.value ||
                        'custom'
                    }
                    onSelect={(val) => setTask(val)}
                />

                {/* Show custom input if 'custom' is selected OR if the current task doesn't match any preset value/label */}
                {(task === 'custom' || (!taskOptions.find(t => t.value === task) && !taskOptions.find(t => t.label === task))) && (
                    <CustomInput
                        label="Task Name"
                        placeholder="Enter task name"
                        value={task === 'custom' ? '' : task}
                        onChangeText={setTask}
                    />
                )}

                <CustomSelectBox
                    label="Frequency"
                    options={frequencyOptions}
                    selectedValue={frequencyOptions.find(f => f.label === frequency)?.value || frequency}
                    onSelect={(val) => setFrequency(frequencyOptions.find(f => f.value === val)?.label || val)}
                />

                <CustomDatePicker
                    label="Next Due Date"
                    value={nextDue}
                    onChange={setNextDue}
                    placeholder="Select Date"
                />

                <View style={styles.footer}>
                    <CustomButton
                        title={isPending ? "Saving..." : (isEditMode ? "Update Task" : "Schedule Task")}
                        onPress={handleSave}
                        disabled={isPending}
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
