import {apiRequest} from '@shared/api/client.js';
import {ENDPOINTS} from '@shared/utils/constants.js';

export const userService = {
    getUsers(filters = {}) {
        const params = new URLSearchParams();

        if (filters.search) {
            params.set('search', filters.search);
        }

        if (filters.limit) {
            params.set('limit', filters.limit);
        }

        if (filters.page !== undefined) {
            params.set('page', filters.page);
        }

        if (filters.size !== undefined) {
            params.set('size', filters.size);
        }

        const query = params.toString();

        return apiRequest(`${ENDPOINTS.users}${query ? `?${query}` : ''}`);
    },

    getTopHunters(limit = 3) {
        return apiRequest(`${ENDPOINTS.userTopHunters}?limit=${limit}`);
    },

    banUser(id) {
        return apiRequest(ENDPOINTS.banUser(id), {
            method: 'POST',
        });
    },

    unbanUser(id) {
        return apiRequest(ENDPOINTS.unbanUser(id), {
            method: 'POST',
        });
    },
};
