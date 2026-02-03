import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../../theme/typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Spacing } from "../../../../theme/spacing";
import { Colors } from '../../../../theme/colors';
import { useState } from "react";
import PropertyModal from "./PropertyModal/PropertyModal";


const DashboardHeader = ({ currentProperty, isGridView, setIsGridView,
    properties,
    switchProperty
}) => {

    const [showPropertyModal, setShowPropertyModal] = useState(false);

    return (

        <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowPropertyModal(true)}>
                <View>

                    <View style={styles.selectorRow}>
                        <Text style={[Typography.title, styles.greeting]}>
                            {currentProperty?.name || 'Loading...'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={Colors.primary} style={{ marginLeft: 4 }} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsGridView(!isGridView)} style={styles.viewToggle}>
                <Ionicons
                    name={isGridView ? "list-outline" : "grid-outline"}
                    size={24}
                    color={Colors.primary}
                />
            </TouchableOpacity>

            <PropertyModal showPropertyModal={showPropertyModal} setShowPropertyModal={setShowPropertyModal}
                properties={properties}
                currentProperty={currentProperty}
                switchProperty={switchProperty}
            />

        </View>
    );
};

export default DashboardHeader;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Spacing.screenPadding,
        paddingVertical: Spacing.l,
        backgroundColor: Colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        color: Colors.primary,
    },
    date: {
        color: Colors.textSecondary,
        marginTop: 4,
    },

    selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewToggle: {
        padding: Spacing.s,
        backgroundColor: Colors.white,
        borderRadius: 8,
        elevation: 1,
    },
})