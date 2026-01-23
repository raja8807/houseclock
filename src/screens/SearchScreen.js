import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';
import CustomInput from '../ui/CustomInput';
import CustomCard from '../ui/CustomCard';
import CustomHeader from '../ui/CustomHeader';
import { dummyItems } from '../data/dummyItems';

const categories = ['All', 'Electronics', 'Furniture', 'Kitchen', 'Home Appliances'];

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredItems = dummyItems.filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    return (
        <View style={styles.container}>
            <CustomHeader title="Search" />
            <View style={styles.content}>
                <CustomInput
                    placeholder="Search items..."
                    value={query}
                    onChangeText={setQuery}
                />

                <View style={styles.chipsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.chip,
                                    selectedCategory === cat && styles.chipSelected,
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        selectedCategory === cat && styles.chipTextSelected,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CustomCard
                            title={item.name}
                            subtitle={item.category}
                            onPress={() => navigation.navigate('ItemDetail', { item })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
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
    chipsContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.l,
        height: 40,
    },
    chip: {
        paddingHorizontal: Spacing.l,
        paddingVertical: Spacing.s,
        borderRadius: 20,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        marginRight: Spacing.s,
    },
    chipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    chipText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    chipTextSelected: {
        color: Colors.white,
    },
    listContent: {
        paddingBottom: Spacing.xxl,
    },
});

export default SearchScreen;
