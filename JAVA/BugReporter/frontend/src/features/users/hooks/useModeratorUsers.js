import {useMemo, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {userKeys} from '@shared/api/queryKeys.js';
import {PAGE_SIZES, STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {emptyPage} from '@shared/utils/pageUtils.js';
import {useDebouncedValue} from '@shared/hooks/useDebouncedValue.js';
import {userService} from '../services/userService.js';

const EMPTY_PAGE = emptyPage(PAGE_SIZES.moderatorUsers);

async function loadUsers(filters) {
    const result = await userService.getUsers(filters);
    if (!result.success) {
        throw new Error(result.error || messages.loadUsersFailed);
    }
    return result.data ?? EMPTY_PAGE;
}

export function useModeratorUsers(isModerator) {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [banErrorMessage, setBanErrorMessage] = useState('');
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

    const queryFilters = useMemo(() => ({
        search: debouncedSearchTerm.trim(),
        page,
        size: PAGE_SIZES.moderatorUsers,
    }), [debouncedSearchTerm, page]);

    const usersQuery = useQuery({
        queryKey: userKeys.list(queryFilters),
        queryFn: () => loadUsers(queryFilters),
        enabled: isModerator,
        staleTime: STALE_TIMES.short,
        placeholderData: (previousData) => previousData,
    });

    const moderationMutation = useMutation({
        mutationFn: ({id, banned}) => banned ? userService.unbanUser(id) : userService.banUser(id),
        onSuccess: (result) => {
            if (!result.success) {
                setBanErrorMessage(result.error || messages.banUserFailed);
                return;
            }
            setBanErrorMessage('');
            queryClient.invalidateQueries({queryKey: userKeys.root});
        },
        onError: () => {
            setBanErrorMessage(messages.banUserFailed);
        },
    });

    const pageData = usersQuery.data ?? EMPTY_PAGE;

    function updateSearchTerm(value) {
        setSearchTerm(value);
        setPage(0);
    }

    return {
        searchTerm,
        pageData,
        users: pageData.content ?? [],
        isLoading: usersQuery.isLoading && !usersQuery.data,
        errorMessage: usersQuery.error?.message ?? '',
        banErrorMessage,
        isSaving: moderationMutation.isPending,
        setPage,
        updateSearchTerm,
        toggleBan: moderationMutation.mutate,
    };
}
