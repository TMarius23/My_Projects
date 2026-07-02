import {beforeEach, describe, expect, it, vi} from 'vitest';
import {apiRequest} from '@shared/api/client.js';
import {authService} from '@features/auth/services/authService.js';

vi.mock('@shared/api/client.js', () => ({
    apiRequest: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('authService.login', () => {
    it('calls apiRequest with POST and JSON credentials', async () => {
        apiRequest.mockResolvedValue({success: true, status: 200, data: {id: 1}});

        await authService.login({email: 'a@b.com', password: 'secret'});

        expect(apiRequest).toHaveBeenCalledWith('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: 'a@b.com', password: 'secret'}),
        });
    });

    it('returns { success: true, user } on success', async () => {
        const user = {id: 1, username: 'alice'};
        apiRequest.mockResolvedValue({success: true, status: 200, data: user});

        const result = await authService.login({email: 'a@b.com', password: 'secret'});

        expect(result.success).toBe(true);
        expect(result.user).toEqual(user);
    });

    it('returns the raw error result on failure', async () => {
        apiRequest.mockResolvedValue({success: false, status: 401, error: 'Invalid credentials'});

        const result = await authService.login({email: 'a@b.com', password: 'wrong'});

        expect(result.success).toBe(false);
        expect(result.status).toBe(401);
        expect(result.error).toBe('Invalid credentials');
    });

    it('returns { success: false } for banned user (403)', async () => {
        apiRequest.mockResolvedValue({success: false, status: 403, error: 'User is banned'});

        const result = await authService.login({email: 'a@b.com', password: 'secret'});

        expect(result.success).toBe(false);
        expect(result.status).toBe(403);
    });
});

describe('authService.register', () => {
    it('calls apiRequest with POST and registration data', async () => {
        apiRequest.mockResolvedValue({success: true, status: 201, data: {}});

        await authService.register({username: 'alice', email: 'a@b.com', password: 'secret'});

        expect(apiRequest).toHaveBeenCalledWith('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: 'alice', email: 'a@b.com', password: 'secret'}),
        });
    });

    it('returns { success: true, user } on success', async () => {
        const user = {id: 2, username: 'alice'};
        apiRequest.mockResolvedValue({success: true, status: 201, data: user});

        const result = await authService.register({username: 'alice', email: 'a@b.com', password: 'secret'});

        expect(result.success).toBe(true);
        expect(result.user).toEqual(user);
    });

    it('returns the raw error result on failure', async () => {
        apiRequest.mockResolvedValue({success: false, status: 409, error: 'Email already exists'});

        const result = await authService.register({username: 'alice', email: 'a@b.com', password: 'secret'});

        expect(result.success).toBe(false);
        expect(result.status).toBe(409);
    });
});

describe('authService.checkSession', () => {
    it('calls GET /api/auth/me', async () => {
        apiRequest.mockResolvedValue({success: true, data: {}});

        await authService.checkSession();

        expect(apiRequest).toHaveBeenCalledWith('/api/auth/me');
    });

    it('returns { authenticated: true, user } when session is valid', async () => {
        const user = {id: 1, username: 'alice', role: 'USER'};
        apiRequest.mockResolvedValue({success: true, data: user});

        const result = await authService.checkSession();

        expect(result).toEqual({authenticated: true, user});
    });

    it('returns { authenticated: false } when not logged in', async () => {
        apiRequest.mockResolvedValue({success: false, status: 401});

        const result = await authService.checkSession();

        expect(result).toEqual({authenticated: false});
    });
});

describe('authService.logout', () => {
    it('calls POST /api/auth/logout', async () => {
        apiRequest.mockResolvedValue({});

        await authService.logout();

        expect(apiRequest).toHaveBeenCalledWith('/api/auth/logout', {method: 'POST'});
    });
});
