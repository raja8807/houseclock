import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetchProperties, useAddProperty } from '../services/api_hooks/property_hooks';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const { data: properties = [], isLoading: isLoadingProperties } = useFetchProperties();

    const { mutateAsync: addPropertyMutation, isPending: isAddingProperty } = useAddProperty();

    const [currentProperty, setCurrentProperty] = useState(null)

    // Derived state for easy consumption

    useEffect(() => {
        if (!currentProperty && properties.length > 0) {
            setCurrentProperty(properties[0]);
        }
    }, [properties])

    // Helper to change property
    const switchProperty = (property) => {
        setCurrentProperty(property);
    };

    // Helper to add property
    const addProperty = async (data) => {
        const newProp = await addPropertyMutation(data);
        setCurrentProperty(newProp); // Auto-switch
        return newProp;
    };

    return (
        <PropertyContext.Provider value={{
            properties,
            currentProperty,
            switchProperty,
            addProperty,
            isLoading: isLoadingProperties,
            isAddingProperty
        }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperty = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperty must be used within a PropertyProvider');
    }
    return context;
};
