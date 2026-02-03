import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export const useFetchProperties = () => {
    return useQuery({
        queryKey: ['properties'],
        queryFn: api.fetchProperties,
    });
};

export const useAddProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.addProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] });
        },
    });
};

