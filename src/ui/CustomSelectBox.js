import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Pressable,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';

const CustomSelectBox = ({ label, options, selectedValue, onSelect, placeholder = 'Select an option' }) => {
    const [visible, setVisible] = useState(false);

    const selectedDisplay = options.find((opt) => opt.value === selectedValue)?.label;

    const handleSelect = (value) => {
        onSelect(value);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, Typography.label]}>{label}</Text>}
            <TouchableOpacity
                style={styles.input}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={[Typography.body, { color: selectedValue ? Colors.text : Colors.textSecondary }]}>
                    {selectedDisplay || placeholder}
                </Text>
                <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={Typography.subtitle}>Select {label}</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.optionItem,
                                        selectedValue === item.value && styles.selectedOption,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text
                                        style={[
                                            Typography.body,
                                            selectedValue === item.value && styles.selectedOptionText,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {selectedValue === item.value && (
                                        <Text style={styles.checkIcon}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.l,
    },
    label: {
        marginBottom: Spacing.s,
        color: Colors.textSecondary,
    },
    input: {
        backgroundColor: Colors.inputBackground,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.m,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    chevron: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: Spacing.xl,
        borderTopRightRadius: Spacing.xl,
        maxHeight: '50%',
        paddingBottom: Spacing.xl,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    closeText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.m,
        paddingHorizontal: Spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    selectedOption: {
        backgroundColor: '#F3F4F6',
    },
    selectedOptionText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    checkIcon: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});

export default CustomSelectBox;
