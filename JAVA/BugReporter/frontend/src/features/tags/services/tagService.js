import {apiRequest} from '@shared/api/client.js';
import {ENDPOINTS} from '@shared/utils/constants.js';

export const tagService = {
    getTags() {
        return apiRequest(ENDPOINTS.tags);
    },

    getTagUsage() {
        return apiRequest(ENDPOINTS.tagUsage);
    },

    createTag(data) {
        return apiRequest(ENDPOINTS.tags, {
            method: 'POST',
            body: data,
        });
    },
};
