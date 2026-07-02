import {memo} from 'react';
import {Link} from 'react-router-dom';
import VoteControl from '@shared/components/voting/VoteControl.jsx';
import {messages} from '@shared/utils/messages.js';
import {formatExactDate, formatRelativeDate} from '@shared/utils/dateFormat.js';
import BugStatusBadge from './BugStatusBadge.jsx';
import './BugFeedCard.css';

function isDisplayableImage(src) {
    return typeof src === 'string' && src.trim().length > 0;
}

function BugFeedCard({bug, currentUserId, onVote, onPrefetch}) {
    const isOwnBug = Boolean(currentUserId && bug.author?.id && String(currentUserId) === String(bug.author.id));
    const prefetchBug = () => onPrefetch?.(bug.id);
    const relativeDate = formatRelativeDate(bug.createdAt);
    const exactDate = formatExactDate(bug.createdAt);

    return (
        <article className="bug-card">
            <VoteControl
                className="bug-card__votes"
                value={bug.voteCount}
                currentVote={bug.currentUserVote}
                disabled={isOwnBug}
                disabledReason={messages.cannotVoteOwnBug}
                upLabel={`Upvote ${bug.title}`}
                downLabel={`Downvote ${bug.title}`}
                onVote={(type) => onVote(bug.id, type)}
            />

            <div className="bug-card__body">
                <header className="bug-card__header">
                    <div>
                        <p>
                            <strong>{bug.author?.username} ({bug.author?.score ?? 0} pts)</strong>
                            <span>•</span>
                            <time dateTime={bug.createdAt} title={exactDate}>{relativeDate}</time>
                        </p>
                        <h2>
                            <Link
                                to={`/bugs/${bug.id}`}
                                onMouseEnter={prefetchBug}
                                onFocus={prefetchBug}
                            >
                                {bug.title}
                            </Link>
                        </h2>
                    </div>
                    <BugStatusBadge status={bug.status}/>
                </header>

                <p className="bug-card__text">{bug.text}</p>

                {isDisplayableImage(bug.picture) && (
                    <Link
                        to={`/bugs/${bug.id}`}
                        aria-label={`Open ${bug.title}`}
                        onMouseEnter={prefetchBug}
                        onFocus={prefetchBug}
                    >
                        <img className="bug-card__image" src={bug.picture} alt="" loading="lazy"/>
                    </Link>
                )}

                <div className="bug-card__tags">
                    {(bug.tagLabels ?? []).map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>

                <footer className="bug-card__footer">
                    <Link
                        to={`/bugs/${bug.id}`}
                        onMouseEnter={prefetchBug}
                        onFocus={prefetchBug}
                    >
                        ▱ {bug.commentCount} Comments
                    </Link>
                </footer>
            </div>
        </article>
    );
}

export default memo(BugFeedCard);
