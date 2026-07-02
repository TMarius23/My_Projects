import {createBrowserRouter, Navigate} from 'react-router-dom';
import AppLayout from '@shared/components/layout/AppLayout.jsx';
import AppErrorBoundary from '@shared/components/feedback/AppErrorBoundary.jsx';
import ProtectedRoute from '@app/ProtectedRoute.jsx';
import {BugDetailRoute, BugListRoute, BugReportRoute, ModeratorUsersRoute, ProfileRoute,} from './routeElements.jsx';
import LoginPage from '@features/auth/pages/LoginPage.jsx';
import RegisterPage from '@features/auth/pages/RegisterPage.jsx';

export const router = createBrowserRouter([
    {path: '/login', element: <LoginPage/>},
    {path: '/register', element: <RegisterPage/>},

    {
        element: (
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>
        ),
        errorElement: <AppErrorBoundary/>,
        children: [
            {index: true, element: <Navigate to="/bugs" replace/>},
            {path: '/bugs', element: <BugListRoute/>},
            {path: '/bugs/mine', element: <Navigate to="/profile" replace/>},
            {path: '/bugs/new', element: <BugReportRoute/>},
            {path: '/bugs/:id', element: <BugDetailRoute/>},
            {path: '/bugs/:id/edit', element: <BugReportRoute/>},
            {path: '/profile', element: <ProfileRoute/>},
            {path: '/moderation/users', element: <ModeratorUsersRoute/>},
        ],
    },

    {path: '*', element: <Navigate to="/bugs" replace/>},
]);
