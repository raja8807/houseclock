import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import CustomInput from '../../shared/CustomInput';
import CustomCard from '../../shared/CustomCard';
import CustomHeader from '../../shared/CustomHeader';
import { dummyItems } from '../../../data/dummyItems';
import CategoryFilter from './CategoryFilter';

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

                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

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
    listContent: {
        paddingBottom: Spacing.xxl,
    },
});

export default SearchScreen;
