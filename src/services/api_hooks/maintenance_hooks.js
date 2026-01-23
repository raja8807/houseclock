import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

// fetchMaintenance is removed as tasks are now nested in items.
// UI components should read tasks directly from the item object.

export const useAddMaintenance = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.addMaintenance,
        onSuccess: async (data, variables, context) => {
            queryClient.setQueryData(['items'], (oldItems) => {
                if (!oldItems) return [];
                return oldItems.map(item => {
                    if (item.id === variables.itemId) {
                        return {
                            ...item,
                            maintenanceTasks: [data, ...item.maintenanceTasks]
                        };
                    }
                    return item;
                });
            });

            await queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useDeleteMaintenance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteMaintenance,
        onSuccess: async (data, variables, context) => {
            // data is { itemId, taskId }
            queryClient.setQueryData(['items'], (oldItems) => {
                if (!oldItems) return [];
                return oldItems.map(item => {
                    if (item.id === data.itemId) {
                        return {
                            ...item,
                            maintenanceTasks: item.maintenanceTasks.filter(t => t.id !== data.taskId)
                        };
                    }
                    return item;
                });
            });
            await queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useEditMaintenance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.updateMaintenance,
        onSuccess: async (data, variables, context) => {
            // data is the updated task
            queryClient.setQueryData(['items'], (oldItems) => {
                if (!oldItems) return [];
                return oldItems.map(item => {
                    if (item.id === data.itemId) {
                        return {
                            ...item,
                            maintenanceTasks: item.maintenanceTasks.map(t =>
                                t.id === data.id ? data : t
                            )
                        };
                    }
                    return item;
                });
            });
            await queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};
