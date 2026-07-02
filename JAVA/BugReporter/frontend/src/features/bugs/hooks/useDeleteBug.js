import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {bugKeys} from '@shared/api/queryKeys.js';
import {bugService} from '../services/bugService.js';

export function useDeleteBug() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bugService.deleteBug,
        onSuccess: (result) => {
            if (!result.success) return;
            queryClient.invalidateQueries({queryKey: bugKeys.root});
            navigate('/bugs');
        },
    });
}
