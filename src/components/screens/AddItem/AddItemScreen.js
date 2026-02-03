import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, Text } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import CustomInput from '../../shared/CustomInput';
import CustomSelectBox from '../../shared/CustomSelectBox';
import CustomButton from '../../shared/CustomButton';
import CustomHeader from '../../shared/CustomHeader';
import CustomDatePicker from '../../shared/CustomDatePicker';
import { useAddItem, useEditItem } from '../../../services/api_hooks/item_hooks';
import { useProperty } from '../../../context/PropertyContext';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddItemScreen = ({ navigation, route }) => {
    const { item } = route.params || {};
    const isEditMode = !!item;

    const [name, setName] = useState(item?.name || '');
    const [category, setCategory] = useState(item?.category || '');
    const [purchaseDate, setPurchaseDate] = useState(item?.purchaseDate || '');
    const [warrantyDuration, setWarrantyDuration] = useState(item?.warrantyDuration?.toString() || '12');
    const [image, setImage] = useState(item?.image || null);

    const { currentProperty } = useProperty();

    const categoryOptions = [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Home Appliances', value: 'home_appliances' },
        { label: 'Kitchen', value: 'kitchen' },
    ];

    const { mutateAsync: addItem, isPending: isAdding } = useAddItem();

    // Request permission on mount logic not strictly needed for basic expo picker, 
    // but pickImage function is needed.

    const pickImage = async () => {
        Alert.alert(
            'Add Photo',
            'Choose an option',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Take Photo', onPress: launchCamera },
                { text: 'Choose from Gallery', onPress: launchGallery },
            ]
        );
    };

    const launchGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const launchCamera = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const { mutateAsync: editItem, isPending: isEditing } = useEditItem();

    const isPending = isAdding || isEditing;

    const handleSave = async () => {
        if (!name || !category || !purchaseDate || !warrantyDuration) {
            Alert.alert('Missing Fields', 'Please fill in all fields.');
            return;
        }

        // Calculate Expiry Date
        const purchase = new Date(purchaseDate);
        const durationMonths = parseInt(warrantyDuration, 10);

        if (isNaN(durationMonths)) {
            Alert.alert('Invalid Input', 'Warranty duration must be a number.');
            return;
        }

        const expiry = new Date(purchase);
        expiry.setMonth(expiry.getMonth() + durationMonths);
        const expiryDate = expiry.toISOString();

        const itemData = {
            name,
            category: categoryOptions.find(c => c.value === category)?.label || category,
            purchaseDate,
            expiryDate,
            warrantyDuration: durationMonths,
            returnWindow: '30 Days',      // Default for MVP
            image,
            propertyId: isEditMode ? item.propertyId : currentProperty?.id,
        };

        try {
            if (isEditMode) {
                await editItem({ id: item.id, ...itemData });
            } else {
                await addItem(itemData);
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', isEditMode ? 'Failed to update item.' : 'Failed to add item. Please try again.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={isEditMode ? "Edit Item" : "Add New Item"} showBack />
            <ScrollView contentContainerStyle={styles.content}>

                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Ionicons name="camera-outline" size={32} color={Colors.textSecondary} />
                            <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <CustomInput
                    label="Item Name"
                    placeholder="e.g. MacBook Pro"
                    value={name}
                    onChangeText={setName}
                />

                <CustomSelectBox
                    label="Category"
                    options={categoryOptions}
                    selectedValue={categoryOptions.find(c => c.label === category)?.value || category}
                    onSelect={(val) => setCategory(categoryOptions.find(c => c.value === val)?.label || val)}
                    placeholder="Select Category"
                />

                <CustomDatePicker
                    label="Purchase Date"
                    value={purchaseDate}
                    onChange={setPurchaseDate}
                    placeholder="Select Date"
                />

                <CustomInput
                    label="Warranty Duration (Months)"
                    placeholder="e.g. 12"
                    value={warrantyDuration}
                    onChangeText={setWarrantyDuration}
                    keyboardType="numeric"
                />

                <View style={styles.spacer} />

                <CustomButton
                    title={isPending ? "Saving..." : (isEditMode ? "Update Item" : "Save Item")}
                    onPress={handleSave}
                    disabled={isPending}
                />

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
    spacer: {
        height: Spacing.xl,
    },
    imagePicker: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        marginBottom: Spacing.l,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default AddItemScreen;
