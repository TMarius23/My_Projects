import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import ProtectedRoute from '@app/ProtectedRoute.jsx';

vi.mock('@features/auth/hooks/useAuth.js', () => ({
    useAuth: vi.fn(),
}));

function renderRoute(authState, routeProps = {}) {
    useAuth.mockReturnValue(authState);
    return render(
        <MemoryRouter initialEntries={['/protected']}>
            <Routes>
                <Route
                    path="/protected"
                    element={
                        <ProtectedRoute {...routeProps}>
                            <div>Protected content</div>
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<div>Login page</div>}/>
                <Route path="/bugs" element={<div>Bugs page</div>}/>
            </Routes>
        </MemoryRouter>,
    );
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('ProtectedRoute — loading state', () => {
    it('renders the spinner while loading', () => {
        renderRoute({user: null, isLoading: true});
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not render protected content while loading', () => {
        renderRoute({user: null, isLoading: true});
        expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    });
});

describe('ProtectedRoute — unauthenticated', () => {
    it('redirects to /login when user is null', () => {
        renderRoute({user: null, isLoading: false});
        expect(screen.getByText('Login page')).toBeInTheDocument();
    });

    it('does not render protected content for unauthenticated user', () => {
        renderRoute({user: null, isLoading: false});
        expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    });
});

describe('ProtectedRoute — authenticated', () => {
    it('renders children when user is authenticated', () => {
        renderRoute({user: {id: 1, role: 'USER'}, isLoading: false});
        expect(screen.getByText('Protected content')).toBeInTheDocument();
    });

    it('renders children regardless of role when requireRole is not set', () => {
        renderRoute({user: {id: 1, role: 'USER'}, isLoading: false});
        expect(screen.getByText('Protected content')).toBeInTheDocument();
    });
});

describe('ProtectedRoute — role guard', () => {
    it('renders children when user has the required role', () => {
        renderRoute(
            {user: {id: 1, role: 'MODERATOR'}, isLoading: false},
            {requireRole: 'MODERATOR'},
        );
        expect(screen.getByText('Protected content')).toBeInTheDocument();
    });

    it('redirects to /bugs when user lacks the required role', () => {
        renderRoute(
            {user: {id: 1, role: 'USER'}, isLoading: false},
            {requireRole: 'MODERATOR'},
        );
        expect(screen.getByText('Bugs page')).toBeInTheDocument();
        expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    });
});
