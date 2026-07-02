import {useCallback} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {loadBugComments} from '@features/comments/hooks/useBugComments.js';
import {bugKeys, commentKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {DEFAULT_COMMENT_SORT} from '@features/comments/utils/commentConstants.js';
import {loadBug} from './useBug.js';

export function usePrefetchBugDetail() {
    const queryClient = useQueryClient();

    return useCallback((bugId) => {
        queryClient.prefetchQuery({
            queryKey: bugKeys.detail(bugId),
            queryFn: () => loadBug(bugId),
            staleTime: STALE_TIMES.short,
        });

        queryClient.prefetchQuery({
            queryKey: commentKeys.byBugSorted(bugId, DEFAULT_COMMENT_SORT),
            queryFn: () => loadBugComments(bugId, DEFAULT_COMMENT_SORT),
            staleTime: STALE_TIMES.medium,
        });
    }, [queryClient]);
}
