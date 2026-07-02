import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {CACHE_TIMES, STALE_TIMES} from '@shared/utils/cacheConfig.js';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: STALE_TIMES.short, gcTime: CACHE_TIMES.session, refetchOnWindowFocus: false, retry: 1,
        },
    },
});

const persister = createSyncStoragePersister({
    storage: window.sessionStorage, key: 'bug-reporter:query-cache',
});

function shouldPersistQuery(query) {
    return query.state.status === 'success' && query.queryKey[0] !== 'auth';
}

export function AppQueryProvider({children}) {
    return (<PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
            persister, maxAge: CACHE_TIMES.session, dehydrateOptions: {
                shouldDehydrateQuery: shouldPersistQuery,
            },
        }}
    >
        {children}
    </PersistQueryClientProvider>);
}
