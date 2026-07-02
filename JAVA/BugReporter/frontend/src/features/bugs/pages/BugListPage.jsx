import {useCallback, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import {useVoteBug} from '@features/votes/hooks/useVoteBug.js';
import LoadingSkeleton from '@shared/components/feedback/LoadingSkeleton.jsx';
import StateMessage from '@shared/components/feedback/StateMessage.jsx';
import {useActionMessage} from '@shared/hooks/useActionMessage.js';
import {messages} from '@shared/utils/messages.js';
import BugFeedCard from '../components/BugFeedCard.jsx';
import BugFeedControls from '../components/BugFeedControls.jsx';
import BugFeedPagination from '../components/BugFeedPagination.jsx';
import BugFeedSidebar from '../components/BugFeedSidebar.jsx';
import {useBugFeedFilters} from '../hooks/useBugFeedFilters.js';
import {useBugFeedMeta} from '../hooks/useBugFeedMeta.js';
import {useBugs} from '../hooks/useBugs.js';
import {adaptBugForUi} from '../utils/bugAdapters.js';
import {usePrefetchBugDetail} from '../hooks/usePrefetchBugDetail.js';
import './BugListPage.css';

function BugListPage({
                         title = 'Bug Feed',
                         initialMineOnly = false,
                         lockMineOnly = false,
                         showControls = true,
                         showSidebar = true,
                         emptyMessage,
                     } = {}) {
    const {user} = useAuth();
    const voteBugMutation = useVoteBug();
    const {message: voteErrorMessage, setMessage: setVoteError, clearMessage: clearVoteError} = useActionMessage();
    const filters = useBugFeedFilters({userId: user?.id, initialMineOnly});
    const {getControlState} = filters;
    const {bugs, pageInfo, isLoading, isFetching, errorMessage} = useBugs(filters.bugFilters);
    const {meta, metaErrorMessage} = useBugFeedMeta();
    const feedBugs = useMemo(() => bugs.map(adaptBugForUi), [bugs]);
    const controlState = useMemo(() => getControlState(meta), [meta, getControlState]);
    const prefetchBugDetail = usePrefetchBugDetail();

    const voteBug = useCallback(async (bugId, type) => {
        clearVoteError();
        const result = await voteBugMutation.mutateAsync({bugId, type});
        if (!result.success) {
            setVoteError(result.error || messages.voteBugFailed);
        }
    }, [voteBugMutation, clearVoteError, setVoteError]);

    return (
        <div className="bug-feed-page">
            <header className="bug-feed-top">
                <h1>
                    {title}
                    {isFetching && !isLoading && <span className="bug-feed-refreshing">Updating...</span>}
                </h1>
                {showControls && (
                    <BugFeedControls
                        filters={filters}
                        controlState={controlState}
                        lockMineOnly={lockMineOnly}
                    />
                )}
            </header>

            <main className={showSidebar ? 'bug-feed-grid' : 'bug-feed-grid bug-feed-grid--single'}>
                <section className="bug-feed-list" aria-label="Bug feed">
                    {isLoading && <LoadingSkeleton count={3}/>}
                    {errorMessage &&
                        <StateMessage className="bug-feed-state" tone="error">{errorMessage}</StateMessage>}
                    {voteErrorMessage &&
                        <StateMessage className="bug-feed-state" tone="error">{voteErrorMessage}</StateMessage>}
                    {metaErrorMessage &&
                        <StateMessage className="bug-feed-state" tone="error">{metaErrorMessage}</StateMessage>}
                    {!isLoading && feedBugs.map((bug) => (
                        <BugFeedCard
                            key={bug.id}
                            bug={bug}
                            currentUserId={user?.id}
                            onVote={voteBug}
                            onPrefetch={prefetchBugDetail}
                        />
                    ))}
                    {!isLoading && !errorMessage && feedBugs.length === 0 && (
                        <StateMessage className="bug-feed-state">
                            {emptyMessage ?? (filters.mineOnly ? messages.noMyBugs : messages.noBugs)}
                        </StateMessage>
                    )}

                    {!isLoading && !errorMessage && (
                        <BugFeedPagination pageInfo={pageInfo} onPageChange={filters.setPage}/>
                    )}
                </section>

                {showSidebar && (
                    <BugFeedSidebar
                        meta={meta}
                        selectedTagId={filters.selectedTagId}
                        onTagSelect={filters.selectTag}
                    />
                )}
            </main>

            <Link to="/bugs/new" className="bug-feed-floating" aria-label="Report new bug">
                <span aria-hidden="true">+</span>
            </Link>
        </div>
    );
}

export default BugListPage;
