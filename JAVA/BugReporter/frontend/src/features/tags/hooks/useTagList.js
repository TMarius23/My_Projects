import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {tagKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {tagService} from '../services/tagService.js';

export async function loadTags() {
    const result = await tagService.getTags();
    if (!result.success) {
        throw new Error(result.error || messages.loadTagsFailed);
    }
    return result.data ?? [];
}

export function useTagList() {
    const query = useQuery({
        queryKey: tagKeys.list,
        queryFn: loadTags,
        staleTime: STALE_TIMES.long,
    });

    const tags = useMemo(
        () => [...(query.data ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
        [query.data],
    );

    return {
        tags,
        isLoading: query.isLoading,
        errorMessage: query.error?.message ?? '',
    };
}
