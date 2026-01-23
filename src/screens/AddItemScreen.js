import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import CustomInput from '../ui/CustomInput';
import CustomSelectBox from '../ui/CustomSelectBox';
import CustomButton from '../ui/CustomButton';
import CustomHeader from '../ui/CustomHeader';

const AddItemScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [warranty, setWarranty] = useState('');
    const [returnWindow, setReturnWindow] = useState('');

    const categories = [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Kitchen', value: 'kitchen' },
        { label: 'Appliances', value: 'appliances' },
    ];

    const handleSave = () => {
        console.log('Keeping item:', { name, category, date, warranty, returnWindow });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Add New Item" showBack />
            <ScrollView contentContainerStyle={styles.content}>
                <CustomInput
                    label="Item Name"
                    placeholder="e.g. MacBook Pro"
                    value={name}
                    onChangeText={setName}
                />

                <CustomSelectBox
                    label="Category"
                    options={categories}
                    selectedValue={category}
                    onSelect={setCategory}
                />

                <CustomInput
                    label="Purchase Date"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChangeText={setDate}
                />

                <CustomInput
                    label="Warranty Duration"
                    placeholder="e.g. 12 Months"
                    value={warranty}
                    onChangeText={setWarranty}
                />

                <CustomInput
                    label="Return Window"
                    placeholder="YYYY-MM-DD"
                    value={returnWindow}
                    onChangeText={setReturnWindow}
                />

                <View style={styles.footer}>
                    <CustomButton
                        title="Save Item"
                        onPress={handleSave}
                        disabled={!name || !category}
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

export default AddItemScreen;
