import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Typography } from '../../../theme/typography';
import CustomSelectBox from '../../shared/CustomSelectBox';
import CustomButton from '../../shared/CustomButton';
import CustomHeader from '../../shared/CustomHeader';

const HomeSetupScreen = ({ navigation }) => {
    const [homeType, setHomeType] = useState('');
    const [ownership, setOwnership] = useState('');

    const homeTypeOptions = [
        { label: 'Apartment', value: 'apartment' },
        { label: 'Independent House', value: 'independent' },
        { label: 'Villa', value: 'villa' },
    ];

    const ownershipOptions = [
        { label: 'Owner', value: 'owner' },
        { label: 'Renter', value: 'renter' },
    ];

    const handleCreateHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Setup Your Home" showBack />
            <View style={styles.content}>
                <Text style={[Typography.body, styles.description]}>
                    Tell us a bit about your place so we can tailor the experience.
                </Text>

                <CustomSelectBox
                    label="Home Type"
                    options={homeTypeOptions}
                    selectedValue={homeType}
                    onSelect={setHomeType}
                    placeholder="Select Application Type"
                />

                <CustomSelectBox
                    label="Ownership"
                    options={ownershipOptions}
                    selectedValue={ownership}
                    onSelect={setOwnership}
                    placeholder="Select Ownership Status"
                />

                <View style={styles.spacer} />

                <CustomButton
                    title="Create Home"
                    onPress={handleCreateHome}
                    disabled={!homeType || !ownership}
                />
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
        flex: 1,
        padding: Spacing.screenPadding,
    },
    description: {
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
        marginTop: Spacing.s,
    },
    spacer: {
        height: Spacing.xl,
    },
});

export default HomeSetupScreen;
