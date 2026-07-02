import {memo, useState} from 'react';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import VoteControl from '@shared/components/voting/VoteControl.jsx';
import {messages} from '@shared/utils/messages.js';
import {formatExactDate, formatRelativeDate} from '@shared/utils/dateFormat.js';
import './CommentItem.css';

function CommentItem({
                         comment,
                         bugAuthorId,
                         isBugSolved,
                         onDelete,
                         onUpdate,
                         onVote,
                         onAccept,
                     }) {
    const {user} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(comment.comment || '');

    const isAuthor = user?.id === comment.author?.id;
    const isModerator = user?.role === 'MODERATOR';
    const canModify = isAuthor || isModerator;
    const canAccept = user?.id === bugAuthorId && !isBugSolved;
    const cannotVoteOwnComment = Boolean(user?.id && comment.author?.id && String(user.id) === String(comment.author.id));
    const relativeDate = formatRelativeDate(comment.createdAt);
    const exactDate = formatExactDate(comment.createdAt);

    async function saveEdit() {
        if (!editValue.trim()) {
            return;
        }

        const success = await onUpdate(comment.id, editValue.trim());
        if (success) {
            setIsEditing(false);
        }
    }

    return (
        <article className="comment-item">
            <VoteControl
                className="comment-item__votes"
                value={comment.voteCount}
                currentVote={comment.currentUserVote}
                disabled={cannotVoteOwnComment}
                disabledReason={messages.cannotVoteOwnComment}
                upLabel="Upvote comment"
                downLabel="Downvote comment"
                onVote={(type) => onVote(comment.id, type)}
            />

            <div className="comment-item__content">
                <header className="comment-item__header">
                    <strong>{comment.author?.username || 'Anonymous'} ({comment.author?.score ?? 0} pts)</strong>
                    <span>•</span>
                    <time title={exactDate}>{relativeDate}</time>
                </header>

                {comment.imageUrl && (
                    <img className="comment-item__image" src={comment.imageUrl} alt="Comment attachment"
                         loading="lazy"/>
                )}

                {isEditing ? (
                    <div className="comment-item__editor">
                        <textarea value={editValue} onChange={(event) => setEditValue(event.target.value)}/>
                        <div>
                            <button type="button" className="comment-item__primary" onClick={saveEdit}>
                                Save
                            </button>
                            <button type="button" className="comment-item__link" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>{comment.comment}</p>
                )}

                <footer className="comment-item__actions">
                    <div>
                        {canAccept && (
                            <button type="button" className="comment-item__link" onClick={() => onAccept(comment.id)}>
                                Accept solution
                            </button>
                        )}
                        {canModify && !isEditing && (
                            <>
                                <button type="button" className="comment-item__link" onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="comment-item__link comment-item__link--danger"
                                    onClick={() => {
                                        if (window.confirm(messages.deleteCommentConfirm)) {
                                            onDelete(comment.id);
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                    <time>{exactDate}</time>
                </footer>
            </div>
        </article>
    );
}

export default memo(CommentItem);
