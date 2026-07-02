import {apiRequest} from '@shared/api/client.js';
import {ENDPOINTS} from '@shared/utils/constants.js';

export const commentService = {
    getCommentsByBug(bugId, sortBy) {
        const params = sortBy ? `?sortBy=${sortBy}` : '';
        return apiRequest(`${ENDPOINTS.commentsByBug(bugId)}${params}`);
    },

    createComment({bugId, comment, imageUrl}) {
        return apiRequest(ENDPOINTS.comments, {
            method: 'POST',
            body: {bugId, comment, imageUrl},
        });
    },

    updateComment({commentId, comment}) {
        return apiRequest(ENDPOINTS.comment(commentId), {
            method: 'PUT',
            body: {comment},
        });
    },

    deleteComment(commentId) {
        return apiRequest(ENDPOINTS.comment(commentId), {
            method: 'DELETE',
        });
    },

    acceptComment({bugId, commentId}) {
        return apiRequest(ENDPOINTS.acceptComment(bugId, commentId), {
            method: 'POST',
        });
    },
};
