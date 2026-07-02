import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import {useLoginForm} from '@features/auth/hooks/useLoginForm.js';
import loginConfig from '@features/auth/loginConfig.json';

vi.mock('@features/auth/hooks/useAuth.js', () => ({
    useAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {...actual, useNavigate: () => mockNavigate};
});

const loginMock = vi.fn();

function setup() {
    useAuth.mockReturnValue({user: null, login: loginMock, isLoading: false});
    return renderHook(() => useLoginForm(loginConfig));
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('useLoginForm — initial state', () => {
    it('starts with empty fields and no errors', () => {
        const {result} = setup();
        expect(result.current.email).toBe('');
        expect(result.current.password).toBe('');
        expect(result.current.errorMessage).toBe('');
        expect(result.current.isAccessRestricted).toBe(false);
        expect(result.current.fieldErrors).toEqual({});
    });
});

describe('useLoginForm — validation', () => {
    it('sets email error when email is empty', async () => {
        const {result} = setup();
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.fieldErrors.email).toBeTruthy();
    });

    it('sets email error for invalid email format', async () => {
        const {result} = setup();
        act(() => result.current.setEmail('notanemail'));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.fieldErrors.email).toBeTruthy();
    });

    it('sets password error when password is empty', async () => {
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.fieldErrors.password).toBeTruthy();
    });

    it('sets password error when password is shorter than minLength', async () => {
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        act(() => result.current.setPassword('abc'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.fieldErrors.password).toBeTruthy();
    });

    it('does not call login when validation fails', async () => {
        const {result} = setup();
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(loginMock).not.toHaveBeenCalled();
    });
});

describe('useLoginForm — submit outcomes', () => {
    it('navigates to /bugs on successful login', async () => {
        loginMock.mockResolvedValue({success: true});
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(mockNavigate).toHaveBeenCalledWith('/bugs');
    });

    it('sets isAccessRestricted for 403 banned response', async () => {
        loginMock.mockResolvedValue({success: false, status: 403, error: 'User is banned'});
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.isAccessRestricted).toBe(true);
    });

    it('sets errorMessage and clears isAccessRestricted for 401', async () => {
        loginMock.mockResolvedValue({success: false, status: 401, error: 'Invalid credentials'});
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.errorMessage).toBeTruthy();
        expect(result.current.isAccessRestricted).toBe(false);
    });

    it('sets network error message for status 0', async () => {
        loginMock.mockResolvedValue({success: false, status: 0});
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.errorMessage).toBe(loginConfig.errors.network);
    });

    it('sets unknown error message for unexpected status', async () => {
        loginMock.mockResolvedValue({success: false, status: 500});
        const {result} = setup();
        act(() => result.current.setEmail('user@example.com'));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(result.current.errorMessage).toBeTruthy();
    });

    it('calls login with trimmed email', async () => {
        loginMock.mockResolvedValue({success: true});
        const {result} = setup();
        act(() => result.current.setEmail('  user@example.com  '));
        act(() => result.current.setPassword('password123'));
        await act(async () => result.current.handleSubmit({preventDefault: vi.fn()}));
        expect(loginMock).toHaveBeenCalledWith(
            expect.objectContaining({email: 'user@example.com'}),
        );
    });
});
