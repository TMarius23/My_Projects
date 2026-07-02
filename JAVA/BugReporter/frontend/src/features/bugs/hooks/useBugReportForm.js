import {useMemo, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {bugKeys, tagKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {messages} from '@shared/utils/messages.js';
import {validateBugDraft} from '@shared/utils/validation.js';
import {bugService} from '../services/bugService.js';
import {useBugReportTags} from './useBugReportTags.js';

const EMPTY_FORM = {
    title: '',
    text: '',
    picture: '',
};

async function loadBug(id) {
    const result = await bugService.getBugById(id);
    if (!result.success) {
        throw new Error(result.error || messages.loadBugFailed);
    }
    return result.data;
}

export function useBugReportForm({bugId, isEditMode, user, onSaved}) {
    const queryClient = useQueryClient();
    const [formDraft, setFormDraft] = useState(null);
    const [message, setMessage] = useState('');

    const bugQuery = useQuery({
        queryKey: bugKeys.detail(bugId),
        queryFn: () => loadBug(bugId),
        enabled: isEditMode,
        staleTime: STALE_TIMES.short,
    });

    const saveBugMutation = useMutation({
        mutationFn: ({id, payload}) =>
            id ? bugService.updateBug(id, payload) : bugService.createBug(payload),
        onSuccess: (result, variables) => {
            if (!result.success) return;
            queryClient.invalidateQueries({queryKey: bugKeys.root});
            queryClient.invalidateQueries({queryKey: tagKeys.root});
            queryClient.invalidateQueries({queryKey: tagKeys.usage});
            if (variables.id) {
                queryClient.invalidateQueries({queryKey: bugKeys.detail(variables.id)});
            }
        },
    });

    const initialForm = useMemo(() => {
        if (!isEditMode || !bugQuery.data) {
            return EMPTY_FORM;
        }

        return {
            title: bugQuery.data.title ?? '',
            text: bugQuery.data.text ?? '',
            picture: bugQuery.data.picture ?? '',
        };
    }, [bugQuery.data, isEditMode]);

    const initialSelectedTagIds = useMemo(() => {
        if (!isEditMode || !bugQuery.data) {
            return [];
        }
        return (bugQuery.data.tags ?? []).map((tag) => tag.id);
    }, [bugQuery.data, isEditMode]);

    const tagSelection = useBugReportTags({
        initialSelectedTagIds,
        onError: setMessage,
    });

    const form = formDraft ?? initialForm;
    const errorMessage = message || tagSelection.errorMessage || bugQuery.error?.message || '';
    const isLoading = tagSelection.isLoading || (isEditMode && bugQuery.isLoading);
    const isSaving = saveBugMutation.isPending || tagSelection.isCreatingTag;
    const canEdit = !isEditMode ||
        user?.role === 'MODERATOR' ||
        (Boolean(user?.id) && String(user.id) === String(bugQuery.data?.author?.id));

    function updateField(field, value) {
        setFormDraft((current) => ({...(current ?? form), [field]: value}));
    }

    async function submit(event) {
        event.preventDefault();
        setMessage('');

        if (!isEditMode && !user?.id) {
            setMessage(messages.loginRequiredForBugReport);
            return;
        }

        if (isEditMode && !canEdit) {
            setMessage(messages.onlyAuthorOrModeratorCanEditBug);
            return;
        }

        const validationMessage = validateBugDraft({
            title: form.title,
            text: form.text,
            picture: form.picture,
            tagIds: tagSelection.selectedTagIds,
        });
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }

        try {
            const payload = {
                title: form.title.trim(),
                text: form.text.trim(),
                picture: form.picture.trim() || null,
                tagIds: tagSelection.selectedTagIds,
            };

            const result = await saveBugMutation.mutateAsync({
                id: isEditMode ? bugId : null,
                payload,
            });

            if (!result.success) {
                setMessage(result.error || messages.saveBugFailed);
                return;
            }

            onSaved();
        } catch (error) {
            setMessage(error.message || messages.saveBugFailed);
        }
    }

    return {
        form,
        tags: tagSelection.tags,
        selectedTags: tagSelection.selectedTags,
        selectedExistingTag: tagSelection.selectedExistingTag,
        selectedExistingTagId: tagSelection.selectedExistingTagId,
        isTagMenuOpen: tagSelection.isTagMenuOpen,
        newTagName: tagSelection.newTagName,
        errorMessage,
        isLoading,
        isSaving,
        canEdit,
        updateField,
        addExistingTag: tagSelection.addExistingTag,
        selectExistingTag: tagSelection.selectExistingTag,
        addNewTag: tagSelection.addNewTag,
        removeSelectedTag: tagSelection.removeSelectedTag,
        setNewTagName: tagSelection.setNewTagName,
        toggleTagMenu: tagSelection.toggleTagMenu,
        submit,
    };
}
