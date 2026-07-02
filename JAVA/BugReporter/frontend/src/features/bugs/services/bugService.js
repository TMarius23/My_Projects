import {apiRequest} from '@shared/api/client.js';
import {ENDPOINTS} from '@shared/utils/constants.js';

export const bugService = {
    getBugs(filters = {}) {
        const params = new URLSearchParams();

        if (filters.title) {
            params.set('title', filters.title);
        }

        if (filters.authorId) {
            params.set('authorId', filters.authorId);
        }

        if (filters.tagId) {
            params.set('tagId', filters.tagId);
        }

        params.set('page', filters.page ?? 0);
        params.set('size', filters.size ?? 10);

        return apiRequest(`${ENDPOINTS.bugs}?${params.toString()}`);
    },

    getBugById(id) {
        return apiRequest(ENDPOINTS.bug(id));
    },

    createBug(data) {
        return apiRequest(ENDPOINTS.bugs, {
            method: 'POST',
            body: data,
        });
    },

    updateBug(id, data) {
        return apiRequest(ENDPOINTS.bug(id), {
            method: 'PUT',
            body: data,
        });
    },

    deleteBug(id) {
        return apiRequest(ENDPOINTS.bug(id), {
            method: 'DELETE',
        });
    },
};
