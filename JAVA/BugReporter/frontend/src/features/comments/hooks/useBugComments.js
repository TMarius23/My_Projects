import {useQuery} from '@tanstack/react-query';
import {commentKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {DEFAULT_COMMENT_SORT} from '../utils/commentConstants.js';
import {commentService} from '../services/commentService.js';
import {adaptCommentForUi} from '../utils/commentAdapters.js';

export async function loadBugComments(bugId, sortBy = DEFAULT_COMMENT_SORT) {
    const result = await commentService.getCommentsByBug(bugId, sortBy);

    if (!result.success) {
        throw new Error(result.error || messages.loadCommentsFailed);
    }

    return (result.data ?? []).map(adaptCommentForUi);
}

export function useBugComments(bugId, sortBy = DEFAULT_COMMENT_SORT, initialComments = []) {
    const query = useQuery({
        queryKey: commentKeys.byBugSorted(bugId, sortBy),
        queryFn: () => loadBugComments(bugId, sortBy),
        enabled: Boolean(bugId),
        placeholderData: (previousData) => previousData ?? initialComments.map(adaptCommentForUi),
        staleTime: STALE_TIMES.medium,
    });

    return {
        comments: query.data ?? [],
        isLoading: query.isLoading && !query.data,
        isFetching: query.isFetching,
        errorMessage: query.error?.message ?? '',
        reload: query.refetch,
    };
}
