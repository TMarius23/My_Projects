import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {tagKeys, userKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {tagService} from '@features/tags/services/tagService.js';
import {userService} from '@features/users/services/userService.js';

const EMPTY_META = {
    tags: [],
    tagCounts: [],
    users: [],
    topHunters: [],
};

async function loadTagUsage() {
    const result = await tagService.getTagUsage();
    if (!result.success) {
        throw new Error(result.error || messages.loadTagUsageFailed);
    }
    return result.data ?? [];
}

async function loadUsers() {
    const result = await userService.getUsers({limit: 100});
    if (!result.success) {
        throw new Error(result.error || messages.loadUsersFailed);
    }
    return result.data ?? [];
}

async function loadTopHunters() {
    const result = await userService.getTopHunters(3);
    if (!result.success) {
        throw new Error(result.error || messages.loadUsersFailed);
    }
    return result.data ?? [];
}

export function useBugFeedMeta() {
    const tagsQuery = useQuery({
        queryKey: tagKeys.usage,
        queryFn: loadTagUsage,
        staleTime: STALE_TIMES.long,
    });

    const usersQuery = useQuery({
        queryKey: userKeys.list({limit: 100}),
        queryFn: loadUsers,
        staleTime: STALE_TIMES.medium,
    });

    const topHuntersQuery = useQuery({
        queryKey: userKeys.topHunters,
        queryFn: loadTopHunters,
        staleTime: STALE_TIMES.short,
    });

    const meta = useMemo(() => {
        const allTags = tagsQuery.data ?? EMPTY_META.tags;
        const users = usersQuery.data ?? EMPTY_META.users;

        return {
            tags: allTags
                .map((tag) => ({id: tag.id, name: tag.name}))
                .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '')),
            tagCounts: allTags
                .map((tag) => ({id: tag.id, name: tag.name, count: tag.count ?? 0}))
                .sort((a, b) => b.count - a.count || (a.name ?? '').localeCompare(b.name ?? ''))
                .slice(0, 6),
            users: users
                .map((item) => ({id: item.id, username: item.username, email: item.email}))
                .sort((a, b) => (a.username ?? '').localeCompare(b.username ?? '')),
            topHunters: topHuntersQuery.data ?? EMPTY_META.topHunters,
        };
    }, [tagsQuery.data, topHuntersQuery.data, usersQuery.data]);

    const metaErrorMessage =
        tagsQuery.error?.message ||
        usersQuery.error?.message ||
        topHuntersQuery.error?.message ||
        '';

    return {meta, metaErrorMessage};
}
