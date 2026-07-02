import {Link, useParams} from 'react-router-dom';
import CommentDiscussion from '@features/comments/components/CommentDiscussion.jsx';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import {useVoteBug} from '@features/votes/hooks/useVoteBug.js';
import LoadingSkeleton from '@shared/components/feedback/LoadingSkeleton.jsx';
import StateMessage from '@shared/components/feedback/StateMessage.jsx';
import VoteControl from '@shared/components/voting/VoteControl.jsx';
import {useActionMessage} from '@shared/hooks/useActionMessage.js';
import {messages} from '@shared/utils/messages.js';
import {formatExactDate} from '@shared/utils/dateFormat.js';
import BugStatusBadge from '../components/BugStatusBadge.jsx';
import {useBug} from '../hooks/useBug.js';
import {useDeleteBug} from '../hooks/useDeleteBug.js';
import './BugDetailPage.css';

function BugDetailPage() {
    const {id} = useParams();
    const {user} = useAuth();
    const {bug, isLoading, errorMessage} = useBug(id);
    const voteBugMutation = useVoteBug();
    const deleteBugMutation = useDeleteBug();
    const actionMessage = useActionMessage();

    async function voteBug(type) {
        actionMessage.clearMessage();
        const result = await voteBugMutation.mutateAsync({bugId: Number(id), type});
        if (!result.success) {
            actionMessage.setMessage(result.error || messages.voteBugFailed);
        }
    }

    if (isLoading) {
        return (
            <div className="bug-detail-page">
                <LoadingSkeleton count={1}/>
            </div>
        );
    }

    if (errorMessage || !bug) {
        return (
            <StateMessage className="bug-detail-state" tone="error">
                {errorMessage || messages.bugNotFound}
            </StateMessage>
        );
    }

    const canModerateBug =
        user?.role === 'MODERATOR' ||
        (user?.id && String(user.id) === String(bug.author?.id));
    const isOwnBug = Boolean(user?.id && bug.author?.id && String(user.id) === String(bug.author.id));

    async function deleteBug() {
        actionMessage.clearMessage();
        const confirmed = window.confirm(messages.deleteBugConfirm);
        if (!confirmed) return;

        const result = await deleteBugMutation.mutateAsync(bug.id);
        if (!result.success) {
            actionMessage.setMessage(result.error || messages.deleteBugFailed);
        }
    }

    return (
        <div className="bug-detail-page">
            <div className="bug-detail-toolbar">
                <Link to="/bugs" className="bug-detail-back">Back to feed</Link>
                {canModerateBug && (
                    <div className="bug-detail-actions">
                        <Link to={`/bugs/${bug.id}/edit`}>Edit</Link>
                        <button
                            type="button"
                            disabled={deleteBugMutation.isPending}
                            onClick={deleteBug}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <article className="bug-detail-card">
                <VoteControl
                    className="bug-detail-votes"
                    value={bug.voteCount}
                    currentVote={bug.currentUserVote}
                    disabled={isOwnBug}
                    disabledReason={messages.cannotVoteOwnBug}
                    upLabel="Upvote bug"
                    downLabel="Downvote bug"
                    onVote={voteBug}
                />

                <div className="bug-detail-body">
                    <header className="bug-detail-header">
                        <div>
                            <p>
                                <strong>{bug.author?.username} ({bug.author?.score ?? 0} pts)</strong>
                                <span>•</span>
                                <time>{formatExactDate(bug.createdAt)}</time>
                            </p>
                            <h1>{bug.title}</h1>
                        </div>
                        <BugStatusBadge status={bug.status} className="bug-detail-status"/>
                    </header>

                    <p className="bug-detail-text">{bug.text}</p>

                    {bug.picture && (
                        <img className="bug-detail-image" src={bug.picture} alt="" loading="lazy"/>
                    )}

                    <div className="bug-detail-tags">
                        {(bug.tags ?? []).map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                </div>
            </article>

            {actionMessage.message &&
                <StateMessage className="bug-detail-state" tone="error">{actionMessage.message}</StateMessage>}

            <CommentDiscussion bug={bug}/>
        </div>
    );
}

export default BugDetailPage;
