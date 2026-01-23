import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <View style={styles.chipsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.chip,
                            selectedCategory === cat && styles.chipSelected,
                        ]}
                        onPress={() => onSelectCategory(cat)}
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
    );
};

const styles = StyleSheet.create({
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
});

export default CategoryFilter;
