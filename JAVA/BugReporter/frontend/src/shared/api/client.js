import axios from 'axios';
import {API_BASE_URL} from '../utils/constants.js';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (shouldClearAuthSession(error)) {
            const status = error?.response?.status;
            window.dispatchEvent(new CustomEvent('auth:unauthorized', {
                detail: {
                    status,
                    message: getErrorMessage(error),
                },
            }));
        }
        return Promise.reject(error);
    },
);

function shouldClearAuthSession(error) {
    const status = error?.response?.status;
    const url = error?.config?.url ?? '';
    const message = getErrorMessage(error).toLowerCase();

    if (url.includes('/api/auth/login')) {
        return false;
    }

    return status === 401 || (status === 403 && message.includes('banned'));
}

function getErrorMessage(error) {
    const data = error?.response?.data;

    if (typeof data === 'string') {
        return data;
    }

    return data?.message || data?.error || error?.message || 'Network error.';
}

// Keeps API calls normalized as { success, status, data?, error? },
// while Axios handles credentials, base URL, JSON parsing, and errors.
export async function apiRequest(path, {method = 'GET', body, headers} = {}) {
    try {
        const response = await apiClient.request({
            url: path,
            method,
            data: body,
            headers,
        });

        return {
            success: true,
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        const status = error?.response?.status ?? 0;

        return {
            success: false,
            status,
            error: getErrorMessage(error) || `Request failed (HTTP ${status}).`,
        };
    }
}
