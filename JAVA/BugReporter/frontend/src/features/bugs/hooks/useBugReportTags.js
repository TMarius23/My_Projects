import {useMemo, useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {tagKeys} from '@shared/api/queryKeys.js';
import {messages} from '@shared/utils/messages.js';
import {tagService} from '@features/tags/services/tagService.js';
import {useTagList} from '@features/tags/hooks/useTagList.js';

function normalizeTagName(value) {
    return value.trim().replace(/^#/, '').toLowerCase();
}

export function useBugReportTags({initialSelectedTagIds, onError}) {
    const queryClient = useQueryClient();
    const [selectedTagIdsDraft, setSelectedTagIdsDraft] = useState(null);
    const [selectedExistingTagId, setSelectedExistingTagId] = useState('');
    const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const {tags, isLoading, errorMessage} = useTagList();

    const createTagMutation = useMutation({
        mutationFn: tagService.createTag,
        onSuccess: (result) => {
            if (result.success && result.data) {
                queryClient.setQueryData(tagKeys.list, (current = []) => {
                    if (current.some((tag) => String(tag.id) === String(result.data.id))) {
                        return current;
                    }
                    return [...current, result.data];
                });
            }
            queryClient.invalidateQueries({queryKey: tagKeys.root});
            queryClient.invalidateQueries({queryKey: tagKeys.usage});
        },
    });

    const selectedTagIds = selectedTagIdsDraft ?? initialSelectedTagIds;
    const selectedTags = useMemo(
        () => tags.filter((tag) => selectedTagIds.some((tagId) => String(tagId) === String(tag.id))),
        [selectedTagIds, tags],
    );
    const selectedExistingTag = tags.find((tag) => String(tag.id) === String(selectedExistingTagId));

    function addSelectedTag(tagId) {
        setSelectedTagIdsDraft((current) => {
            const tagIds = current ?? selectedTagIds;
            return tagIds.some((item) => String(item) === String(tagId)) ? tagIds : [...tagIds, Number(tagId)];
        });
    }

    function addExistingTag() {
        if (!selectedExistingTagId) return;
        addSelectedTag(selectedExistingTagId);
        setSelectedExistingTagId('');
    }

    function selectExistingTag(tagId) {
        setSelectedExistingTagId(tagId);
        setIsTagMenuOpen(false);
    }

    async function addNewTag() {
        const name = normalizeTagName(newTagName);
        if (!name) return;

        const existingTag = tags.find((tag) => tag.name.toLowerCase() === name);
        if (existingTag) {
            addSelectedTag(existingTag.id);
            setNewTagName('');
            return;
        }

        const result = await createTagMutation.mutateAsync({name});
        if (!result.success) {
            onError(result.error || messages.createTagFailed);
            return;
        }

        addSelectedTag(result.data.id);
        setNewTagName('');
        setIsTagMenuOpen(false);
        setSelectedExistingTagId('');
    }

    function removeSelectedTag(tagId) {
        setSelectedTagIdsDraft((current) =>
            (current ?? selectedTagIds).filter((item) => String(item) !== String(tagId)),
        );
    }

    return {
        tags,
        selectedTags,
        selectedTagIds,
        selectedExistingTag,
        selectedExistingTagId,
        isTagMenuOpen,
        newTagName,
        isLoading,
        isCreatingTag: createTagMutation.isPending,
        errorMessage,
        addExistingTag,
        selectExistingTag,
        addNewTag,
        removeSelectedTag,
        setNewTagName,
        toggleTagMenu: () => setIsTagMenuOpen((isOpen) => !isOpen),
    };
}
