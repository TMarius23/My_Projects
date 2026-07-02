import {apiRequest} from '@shared/api/client.js';
import {ENDPOINTS} from '@shared/utils/constants.js';

export const authService = {
    async register({username, email, phoneNumber, password}) {
        const result = await apiRequest(ENDPOINTS.register, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, phoneNumber, password}),
        });
        if (result.success) {
            return {success: true, status: result.status, user: result.data};
        }
        return result;
    },

    async login({email, password}) {
        const result = await apiRequest(ENDPOINTS.login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });
        if (result.success) {
            return {success: true, status: result.status, user: result.data};
        }
        return result;
    },

    async checkSession() {
        const result = await apiRequest(ENDPOINTS.me);
        if (result.success) {
            return {authenticated: true, user: result.data};
        }
        return {authenticated: false};
    },

    async logout() {
        await apiRequest(ENDPOINTS.logout, {method: 'POST'});
    },
};
