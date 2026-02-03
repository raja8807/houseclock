import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Spacing } from "../../../../../theme/spacing"
import { Typography } from "../../../../../theme/typography";
import { Colors } from "../../../../../theme/colors";

const PropertyModal = (
    {
        showPropertyModal,
        setShowPropertyModal,
        properties,
        currentProperty,
        switchProperty,
        setShowAddProperty
    }
) => {
    return (
        <Modal
            visible={showPropertyModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowPropertyModal(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowPropertyModal(false)}
            >
                <View style={styles.modalContent}>
                    <Text style={[Typography.subtitle, styles.modalTitle]}>Select Property</Text>
                    {properties.map(prop => (
                        <TouchableOpacity
                            key={prop.id}
                            style={[
                                styles.propertyOption,
                                currentProperty?.id === prop.id && styles.selectedProperty
                            ]}
                            onPress={() => {
                                switchProperty(prop);
                                setShowPropertyModal(false);
                            }}
                        >
                            <Text style={[
                                styles.propertyOptionText,
                                currentProperty?.id === prop.id && styles.selectedPropertyText
                            ]}>
                                {prop.name}
                            </Text>
                            {currentProperty?.id === prop.id && (
                                <Ionicons name="checkmark" size={20} color={Colors.primary} />
                            )}
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.addPropertyOption}
                        onPress={() => {
                            setShowPropertyModal(false);
                            setShowAddProperty(true);
                        }}
                    >
                        <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
                        <Text style={styles.addPropertyText}>Add New Property</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '80%',
        backgroundColor: Colors.white,
        borderRadius: Spacing.borderRadius,
        padding: Spacing.l,
        elevation: 5,
    },

    modalTitle: {
        marginBottom: Spacing.m,
        textAlign: 'center',
    },

    propertyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.s,
    },

    selectedProperty: {
        backgroundColor: Colors.primary,
    },

    propertyOptionText: {
        fontSize: Typography.body.fontSize,
        color: Colors.text,
    },

    selectedPropertyText: {
        color: Colors.white,
    },

    addPropertyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.l,
    },

    addPropertyText: {
        fontSize: Typography.body.fontSize,
        color: Colors.text,
        marginLeft: Spacing.s,
    },
})


export default PropertyModal