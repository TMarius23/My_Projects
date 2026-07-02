import {lazy, Suspense} from 'react';
import ProtectedRoute from '@app/ProtectedRoute.jsx';
import LoadingSkeleton from '@shared/components/feedback/LoadingSkeleton.jsx';

const LoginPage = lazy(() => import('@features/auth/pages/LoginPage.jsx'));
const BugDetailPage = lazy(() => import('@features/bugs/pages/BugDetailPage.jsx'));
const BugListPage = lazy(() => import('@features/bugs/pages/BugListPage.jsx'));
const BugReportPage = lazy(() => import('@features/bugs/pages/BugReportPage.jsx'));
const ProfilePage = lazy(() => import('@features/users/pages/ProfilePage.jsx'));
const ModeratorUsersPage = lazy(() => import('@features/users/pages/ModeratorUsersPage.jsx'));

function LazyRoute({children}) {
    return (
        <Suspense fallback={<LoadingSkeleton count={2}/>}>
            {children}
        </Suspense>
    );
}

export function LoginRoute() {
    return (
        <LazyRoute>
            <LoginPage/>
        </LazyRoute>
    );
}

export function BugListRoute() {
    return (
        <LazyRoute>
            <BugListPage/>
        </LazyRoute>
    );
}

export function ProfileRoute() {
    return (
        <LazyRoute>
            <ProfilePage/>
        </LazyRoute>
    );
}

export function BugReportRoute() {
    return (
        <LazyRoute>
            <BugReportPage/>
        </LazyRoute>
    );
}

export function BugDetailRoute() {
    return (
        <LazyRoute>
            <BugDetailPage/>
        </LazyRoute>
    );
}

export function ModeratorUsersRoute() {
    return (
        <LazyRoute>
            <ProtectedRoute requireRole="MODERATOR">
                <ModeratorUsersPage/>
            </ProtectedRoute>
        </LazyRoute>
    );
}
