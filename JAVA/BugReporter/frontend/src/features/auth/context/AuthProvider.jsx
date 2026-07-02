import {useCallback, useEffect, useMemo, useState} from 'react';
import {useIsRestoring, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {authKeys} from '@shared/api/queryKeys.js';
import {STALE_TIMES} from '@shared/utils/cacheConfig.js';
import {authService} from '../services/authService.js';
import {AuthContext} from './AuthContext.jsx';

function AuthProvider({children}) {
    const queryClient = useQueryClient();
    const isRestoring = useIsRestoring();
    const [user, setUser] = useState(undefined);

    const sessionQuery = useQuery({
        queryKey: authKeys.me,
        queryFn: authService.checkSession,
        staleTime: STALE_TIMES.short,
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (result, variables) => {
            if (!result.success) return;
            const nextUser = result.user ?? {email: variables.email};
            setUser(nextUser);
            queryClient.setQueryData(authKeys.me, {
                authenticated: true,
                user: nextUser,
            });
        },
    });

    const logoutMutation = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            setUser(null);
            queryClient.setQueryData(authKeys.me, {authenticated: false});
        },
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
    });

    useEffect(() => {
        function handleUnauthorized() {
            setUser(null);
            queryClient.setQueryData(authKeys.me, {authenticated: false});
        }

        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    }, [queryClient]);

    const login = useCallback(async ({email, password}) => {
        return loginMutation.mutateAsync({email, password});
    }, [loginMutation]);

    const register = useCallback(async ({username, email, phoneNumber, password}) => {
        return registerMutation.mutateAsync({username, email, phoneNumber, password});
    }, [registerMutation]);

    const logout = useCallback(async () => {
        await logoutMutation.mutateAsync();
    }, [logoutMutation]);

    const sessionUser = sessionQuery.data?.authenticated ? sessionQuery.data.user : null;
    const currentUser = user === undefined ? sessionUser : user;
    const isLoading =
        isRestoring ||
        (sessionQuery.isPending && user === undefined) ||
        loginMutation.isPending ||
        logoutMutation.isPending ||
        registerMutation.isPending;

    const value = useMemo(
        () => ({user: currentUser, isLoading, login, logout, register}),
        [currentUser, isLoading, login, logout, register],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
