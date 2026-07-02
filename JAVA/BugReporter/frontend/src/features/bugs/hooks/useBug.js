import {useQuery, useQueryClient} from '@tanstack/react-query';
import {bugKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {bugService} from '../services/bugService.js';
import {adaptBugForUi} from '../utils/bugAdapters.js';

export async function loadBug(id) {
    const result = await bugService.getBugById(id);

    if (!result.success) {
        throw new Error(result.error || messages.loadBugFailed);
    }

    return adaptBugForUi(result.data);
}

function findBugPreviewInCache(queryClient, id) {
    const cachedLists = queryClient.getQueriesData({queryKey: bugKeys.root});

    for (const [, pageData] of cachedLists) {
        const match = pageData?.content?.find((bug) => String(bug.id) === String(id));
        if (match) {
            return adaptBugForUi(match);
        }
    }

    return undefined;
}

export function useBug(id) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: bugKeys.detail(id),
        queryFn: () => loadBug(id),
        enabled: Boolean(id),
        placeholderData: () => findBugPreviewInCache(queryClient, id),
        staleTime: STALE_TIMES.short,
    });

    return {
        bug: query.data ?? null,
        isLoading: query.isLoading && !query.data,
        isFetching: query.isFetching,
        isPlaceholderData: query.isPlaceholderData,
        errorMessage: query.error?.message ?? '',
        reload: query.refetch,
    };
}
