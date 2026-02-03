import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export const useFetchItems = (propertyId) => {
    return useQuery({
        queryKey: ['items', propertyId],
        queryFn: () => api.fetchItems(propertyId),
    });
};

export const useAddItem = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.addItem,
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ queryKey: ['items'] });
            options.onSuccess?.(data, variables, context);
        },
        onError: options.onError,
    });
};

export const useDeleteItem = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteItem,
        onSuccess: async (data, variables, context) => {
            queryClient.setQueryData(['items'], (oldData) => {
                return oldData ? oldData.filter(item => item.id !== variables) : [];
            });
            await queryClient.invalidateQueries({ queryKey: ['items'] });
            options.onSuccess?.(data, variables, context);
        },
        onError: options.onError,
    });
};

export const useEditItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.updateItem,
        onSuccess: async (data, variables, context) => {
            // Update 'items' cache immediately
            queryClient.setQueryData(['items'], (oldData) => {
                if (!oldData) return [];
                return oldData.map(item => item.id === data.id ? data : item);
            });
            await queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};
