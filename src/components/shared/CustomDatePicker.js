import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { formatDate } from '../../utils/dateUtils';

const CustomDatePicker = ({ label, value, onChange, placeholder = 'Select Date' }) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(value ? new Date(value) : new Date());

    const handleChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }

        if (selectedDate) {
            setDate(selectedDate);
            // Format to YYYY-MM-DD for consistency with existing app data
            const formattedDate = selectedDate.toISOString().split('T')[0];
            onChange(formattedDate);
        }
    };

    const handleConfirmIOS = () => {
        const formattedDate = date.toISOString().split('T')[0];
        onChange(formattedDate);
        setShow(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShow(true)}
                activeOpacity={0.7}
            >
                <Text style={[styles.text, !value && styles.placeholder]}>
                    {value ? value : placeholder}
                </Text>
            </TouchableOpacity>

            {show && Platform.OS === 'android' && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />
            )}

            {show && Platform.OS === 'ios' && (
                <Modal transparent animationType="fade">
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={handleChange}
                                style={styles.iosPicker}
                            />
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmIOS}>
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.m,
    },
    label: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
        fontWeight: '500',
    },
    inputContainer: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.m,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: Colors.text,
    },
    placeholder: {
        color: '#9CA3AF',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center'
    },
    iosPicker: {
        width: '100%',
        height: 200
    },
    confirmButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default CustomDatePicker;
