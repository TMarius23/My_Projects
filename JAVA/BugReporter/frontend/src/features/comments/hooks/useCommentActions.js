import {useMutation, useQueryClient} from '@tanstack/react-query';
import {bugKeys, commentKeys, userKeys} from '@shared/api/queryKeys.js';
import {applyVote} from '@shared/utils/voteUtils.js';
import {voteService} from '@features/votes/services/voteService.js';
import {commentService} from '../services/commentService.js';
import {adaptCommentForUi} from '../utils/commentAdapters.js';

function updateCommentInBug(bug, commentId, type) {
    if (!bug?.comments) return bug;

    return {
        ...bug,
        comments: bug.comments.map((comment) => (
            String(comment.id) === String(commentId) ? applyVote(comment, type) : comment
        )),
    };
}

function updateCommentInList(comments, commentId, type) {
    if (!Array.isArray(comments)) return comments;

    return comments.map((comment) => (
        String(comment.id) === String(commentId) ? applyVote(comment, type) : comment
    ));
}

function replaceCommentInList(comments, updatedComment) {
    if (!Array.isArray(comments)) return comments;

    return comments.map((comment) => (
        String(comment.id) === String(updatedComment.id) ? adaptCommentForUi(updatedComment) : comment
    ));
}

export function useCommentActions(bugId) {
    const queryClient = useQueryClient();

    function invalidateComments() {
        queryClient.invalidateQueries({queryKey: commentKeys.byBug(bugId)});
    }

    function invalidateBugDetail() {
        queryClient.invalidateQueries({queryKey: bugKeys.detail(bugId)});
    }

    function invalidateBugFeed() {
        queryClient.invalidateQueries({queryKey: bugKeys.lists});
    }

    const createComment = useMutation({
        mutationFn: commentService.createComment,
        onSuccess: (result) => {
            if (!result.success) return;
            if (result.data) {
                queryClient.setQueriesData(
                    {queryKey: commentKeys.byBug(bugId)},
                    (comments = []) => [...comments, adaptCommentForUi(result.data)],
                );
            }
            invalidateComments();
            invalidateBugDetail();
            invalidateBugFeed();
        },
    });

    const updateComment = useMutation({
        mutationFn: commentService.updateComment,
        onSuccess: (result) => {
            if (!result.success) return;
            if (result.data) {
                queryClient.setQueriesData(
                    {queryKey: commentKeys.byBug(bugId)},
                    (comments) => replaceCommentInList(comments, result.data),
                );
            }
            invalidateComments();
            invalidateBugDetail();
        },
    });

    const deleteComment = useMutation({
        mutationFn: commentService.deleteComment,
        onSuccess: (result, commentId) => {
            if (!result.success) return;
            queryClient.setQueriesData(
                {queryKey: commentKeys.byBug(bugId)},
                (comments) => Array.isArray(comments)
                    ? comments.filter((comment) => String(comment.id) !== String(commentId))
                    : comments,
            );
            invalidateComments();
            invalidateBugDetail();
            invalidateBugFeed();
        },
    });

    const voteComment = useMutation({
        mutationFn: voteService.voteComment,
        onMutate: async ({commentId, type}) => {
            await Promise.all([
                queryClient.cancelQueries({queryKey: commentKeys.byBug(bugId)}),
                queryClient.cancelQueries({queryKey: bugKeys.detail(bugId)}),
            ]);

            const previousCommentsList = queryClient.getQueriesData({queryKey: commentKeys.byBug(bugId)});
            const previousBug = queryClient.getQueryData(bugKeys.detail(bugId));

            queryClient.setQueriesData(
                {queryKey: commentKeys.byBug(bugId)},
                (comments) => updateCommentInList(comments, commentId, type),
            );

            queryClient.setQueryData(
                bugKeys.detail(bugId),
                (bug) => updateCommentInBug(bug, commentId, type),
            );

            return {previousCommentsList, previousBug};
        },
        onSuccess: (result, _variables, context) => {
            if (!result.success) {
                context?.previousCommentsList?.forEach(([key, data]) => queryClient.setQueryData(key, data));
                queryClient.setQueryData(bugKeys.detail(bugId), context?.previousBug);
                return;
            }
            queryClient.invalidateQueries({queryKey: userKeys.topHunters});
        },
        onError: (_error, _variables, context) => {
            context?.previousCommentsList?.forEach(([key, data]) => queryClient.setQueryData(key, data));
            queryClient.setQueryData(bugKeys.detail(bugId), context?.previousBug);
        },
    });

    const acceptComment = useMutation({
        mutationFn: commentService.acceptComment,
        onSuccess: (result) => {
            if (!result.success) return;
            invalidateComments();
            invalidateBugDetail();
            invalidateBugFeed();
        },
    });

    return {
        createComment,
        updateComment,
        deleteComment,
        voteComment,
        acceptComment,
    };
}
