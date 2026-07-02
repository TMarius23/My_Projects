import {useEffect} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {bugKeys} from '@shared/api/queryKeys.js';
import {PAGE_SIZES, STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {emptyPage} from '@shared/utils/pageUtils.js';
import {bugService} from '../services/bugService.js';

const EMPTY_PAGE = emptyPage(PAGE_SIZES.bugs);

export function normalizeBugFilters(filters) {
    return Object.keys(filters)
        .sort()
        .reduce((normalized, key) => ({...normalized, [key]: filters[key]}), {});
}

function getPageInfo(pageData) {
    return {
        totalElements: pageData?.totalElements ?? 0,
        totalPages: pageData?.totalPages ?? 0,
        size: pageData?.size ?? PAGE_SIZES.bugs,
        number: pageData?.number ?? 0,
        first: pageData?.first ?? true,
        last: pageData?.last ?? true,
    };
}

export async function loadBugs(filters) {
    const result = await bugService.getBugs(filters);

    if (!result.success) {
        throw new Error(result.error || messages.loadBugsFailed);
    }

    return result.data ?? EMPTY_PAGE;
}

export function useBugs(filters) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: bugKeys.list(filters),
        queryFn: () => loadBugs(filters),
        staleTime: STALE_TIMES.short,
        placeholderData: (previousData) => previousData,
    });

    const pageData = query.data ?? EMPTY_PAGE;
    const pageInfo = getPageInfo(pageData);

    useEffect(() => {
        if (query.isPlaceholderData || pageInfo.last || pageInfo.totalPages <= 1) {
            return;
        }

        const nextPageFilters = normalizeBugFilters({
            ...filters,
            page: pageInfo.number + 1,
        });

        queryClient.prefetchQuery({
            queryKey: bugKeys.list(nextPageFilters),
            queryFn: () => loadBugs(nextPageFilters),
            staleTime: STALE_TIMES.short,
        });
    }, [
        filters,
        pageInfo.last,
        pageInfo.number,
        pageInfo.totalPages,
        query.isPlaceholderData,
        queryClient,
    ]);

    return {
        bugs: pageData.content ?? [],
        pageInfo,
        isLoading: query.isLoading && !query.data,
        isFetching: query.isFetching,
        isPlaceholderData: query.isPlaceholderData,
        errorMessage: query.error?.message ?? '',
        reload: query.refetch,
    };
}
