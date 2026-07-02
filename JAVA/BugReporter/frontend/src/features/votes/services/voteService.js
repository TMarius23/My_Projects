import {apiRequest} from '@shared/api/client.js';
import {ENDPOINTS} from '@shared/utils/constants.js';

export const voteService = {
    voteBug({bugId, type}) {
        return apiRequest(ENDPOINTS.voteBug, {
            method: 'POST',
            body: {bugId, type},
        });
    },

    voteComment({commentId, type}) {
        return apiRequest(ENDPOINTS.voteComment, {
            method: 'POST',
            body: {commentId, type},
        });
    },
};
