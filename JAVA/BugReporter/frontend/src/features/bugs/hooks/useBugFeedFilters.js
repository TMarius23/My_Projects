import {useCallback, useMemo, useState} from 'react';
import {PAGE_SIZES} from '@shared/utils/cacheConfig.js';
import {useDebouncedValue} from '@shared/hooks/useDebouncedValue.js';
import {normalizeBugFilters} from './useBugs.js';

export function useBugFeedFilters({userId, initialMineOnly = false} = {}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTagId, setSelectedTagId] = useState('all');
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [tagSearchTerm, setTagSearchTerm] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('all');
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [mineOnly, setMineOnly] = useState(initialMineOnly);
    const [page, setPage] = useState(0);
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

    const bugFilters = useMemo(() => {
        const filters = {};
        const title = debouncedSearchTerm.trim();

        if (title) {
            filters.title = title;
        }

        if (selectedTagId !== 'all') {
            filters.tagId = selectedTagId;
        }

        if (mineOnly && userId) {
            filters.authorId = userId;
        } else if (selectedUserId !== 'all') {
            filters.authorId = selectedUserId;
        }

        filters.page = page;
        filters.size = PAGE_SIZES.bugs;

        return normalizeBugFilters(filters);
    }, [debouncedSearchTerm, mineOnly, page, selectedTagId, selectedUserId, userId]);

    const getControlState = useCallback((meta) => {
        const selectedTag = meta.tags.find((tag) => String(tag.id) === String(selectedTagId));
        const selectedUser = meta.users.find((item) => String(item.id) === String(selectedUserId));
        const userQuery = userSearchTerm.trim().toLowerCase();
        const tagQuery = tagSearchTerm.trim().toLowerCase();
        const visibleUsers = userQuery
            ? meta.users.filter((item) =>
                [item.username, item.email].filter(Boolean).some((value) =>
                    value.toLowerCase().includes(userQuery),
                ),
            )
            : meta.users;
        const visibleTags = tagQuery
            ? meta.tags.filter((tag) => tag.name.toLowerCase().includes(tagQuery))
            : meta.tags;

        return {
            selectedTagLabel: selectedTagId === 'all' ? 'All Tags' : selectedTag?.name ?? 'All Tags',
            selectedUserLabel: mineOnly
                ? 'My Bugs'
                : selectedUserId === 'all'
                    ? 'All Users'
                    : selectedUser?.username ?? 'All Users',
            visibleUsers,
            visibleTags,
        };
    }, [selectedTagId, selectedUserId, mineOnly, userSearchTerm, tagSearchTerm]);

    function selectTag(tagId) {
        setSelectedTagId(tagId);
        setTagSearchTerm('');
        setIsTagOpen(false);
        setPage(0);
    }

    function selectUser(userIdValue) {
        setSelectedUserId(userIdValue);
        setUserSearchTerm('');
        setIsUserOpen(false);
        setPage(0);
    }

    function updateMineOnly(isChecked) {
        setMineOnly(isChecked);
        setPage(0);
        if (isChecked) {
            setSelectedUserId('all');
            setIsUserOpen(false);
        }
    }

    function updateSearchTerm(value) {
        setSearchTerm(value);
        setPage(0);
    }

    return {
        searchTerm,
        selectedTagId,
        isTagOpen,
        tagSearchTerm,
        selectedUserId,
        isUserOpen,
        userSearchTerm,
        mineOnly,
        bugFilters,
        setIsTagOpen,
        setIsUserOpen,
        setTagSearchTerm,
        setUserSearchTerm,
        setPage,
        selectTag,
        selectUser,
        updateMineOnly,
        updateSearchTerm,
        getControlState,
    };
}
