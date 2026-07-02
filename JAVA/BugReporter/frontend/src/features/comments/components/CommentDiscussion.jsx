import {useCallback, useState} from 'react';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import DropdownMenu from '@shared/components/dropdown/DropdownMenu.jsx';
import LoadingSkeleton from '@shared/components/feedback/LoadingSkeleton.jsx';
import StateMessage from '@shared/components/feedback/StateMessage.jsx';
import {isValidImageSource} from '@shared/utils/validation.js';
import {messages} from '@shared/utils/messages.js';
import {useActionMessage} from '@shared/hooks/useActionMessage.js';
import {COMMENT_SORT_OPTIONS, DEFAULT_COMMENT_SORT,} from '../utils/commentConstants.js';
import {useBugComments} from '../hooks/useBugComments.js';
import {useCommentActions} from '../hooks/useCommentActions.js';
import {useCommentComposer} from '../hooks/useCommentComposer.js';
import CommentItem from './CommentItem.jsx';
import './CommentDiscussion.css';

function CommentDiscussion({bug}) {
    const {user} = useAuth();
    const {
        createComment: createCommentMutation,
        updateComment: updateCommentMutation,
        deleteComment: deleteCommentMutation,
        voteComment: voteCommentMutation,
        acceptComment: acceptCommentMutation,
    } = useCommentActions(bug.id);
    const [sortType, setSortType] = useState(DEFAULT_COMMENT_SORT);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const {message: actionError, setMessage: setActionError, clearMessage: clearActionError} = useActionMessage();
    const bugId = bug.id;

    const {
        comments,
        isLoading,
        isFetching,
        errorMessage,
    } = useBugComments(bugId, sortType, bug.comments ?? []);

    const composer = useCommentComposer({
        bugId,
        onCreate: createCommentMutation.mutateAsync,
    });

    const shouldShowLoading = isLoading || (isFetching && comments.length === 0);
    const selectedSortLabel = COMMENT_SORT_OPTIONS.find((option) => option.value === sortType)?.label ?? COMMENT_SORT_OPTIONS[0].label;

    const updateComment = useCallback(async (commentId, value) => {
        clearActionError();
        const result = await updateCommentMutation.mutateAsync({commentId, comment: value});
        if (!result.success) {
            setActionError(result.error || messages.updateCommentFailed);
        }
        return result.success;
    }, [updateCommentMutation, clearActionError, setActionError]);

    const deleteComment = useCallback(async (commentId) => {
        clearActionError();
        const result = await deleteCommentMutation.mutateAsync(commentId);
        if (!result.success) {
            setActionError(result.error || messages.deleteCommentFailed);
        }
    }, [deleteCommentMutation, clearActionError, setActionError]);

    const voteComment = useCallback(async (commentId, type) => {
        clearActionError();
        const result = await voteCommentMutation.mutateAsync({commentId, type});
        if (!result.success) {
            setActionError(result.error || messages.voteCommentFailed);
        }
    }, [voteCommentMutation, clearActionError, setActionError]);

    const acceptComment = useCallback(async (commentId) => {
        clearActionError();
        const result = await acceptCommentMutation.mutateAsync({bugId, commentId});
        if (!result.success) {
            setActionError(result.error || messages.acceptCommentFailed);
        }
    }, [acceptCommentMutation, bugId, clearActionError, setActionError]);

    return (
        <section className="comment-discussion">
            <header className="comment-discussion__header">
                <h2>Discussion</h2>
                <DropdownMenu
                    className="comment-sort-menu"
                    label="Sort by"
                    triggerLabel={selectedSortLabel}
                    isOpen={isSortOpen}
                    onOpenChange={setIsSortOpen}
                    menuId="comment-sort-menu"
                >
                    {COMMENT_SORT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            role="menuitem"
                            className={`dropdown-menu__item ${sortType === option.value ? 'is-selected' : ''}`}
                            onClick={() => {
                                setSortType(option.value);
                                setIsSortOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </DropdownMenu>
            </header>

            <div className="comment-discussion__composer">
                <div className="comment-discussion__avatar">{user?.username?.slice(0, 1).toUpperCase() || 'U'}</div>
                <div className="comment-discussion__box">
          <textarea
              placeholder="Add a comment or suggest a fix..."
              value={composer.comment}
              onChange={(event) => composer.setComment(event.target.value)}
              onPaste={composer.handleImagePaste}
          />
                    {composer.isAttachmentOpen && (
                        <>
                            <input
                                type="text"
                                placeholder="Paste screenshot here or add an image URL..."
                                value={composer.imageUrl}
                                onChange={(event) => composer.setImageUrl(event.target.value)}
                                onPaste={composer.handleImagePaste}
                            />
                            {isValidImageSource(composer.imageUrl) && (
                                <div className="comment-discussion__preview">
                                    <img src={composer.imageUrl} alt="Comment attachment preview"/>
                                    <button type="button" onClick={() => composer.setImageUrl('')}>
                                        Remove image
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    <div className="comment-discussion__actions">
                        <button type="button" className="comment-discussion__link"
                                onClick={() => composer.setIsAttachmentOpen((open) => !open)}>
                            {composer.imageUrl ? 'Image attached' : 'Attach screenshot'}
                        </button>
                        <button
                            type="button"
                            className="comment-discussion__submit"
                            disabled={createCommentMutation.isPending}
                            onClick={composer.submit}
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>

            {(composer.message || actionError) && (
                <StateMessage className="comment-discussion__message" tone="error">
                    {composer.message || actionError}
                </StateMessage>
            )}
            {errorMessage && (
                <StateMessage className="comment-discussion__message" tone="error">
                    {errorMessage}
                </StateMessage>
            )}

            <div className="comment-discussion__list">
                {shouldShowLoading ? (
                    <LoadingSkeleton count={1}/>
                ) : comments.length > 0 ? (
                    comments.map((item) => (
                        <CommentItem
                            key={item.id}
                            comment={item}
                            bugAuthorId={bug.author?.id}
                            isBugSolved={bug.status === 'SOLVED'}
                            onDelete={deleteComment}
                            onUpdate={updateComment}
                            onVote={voteComment}
                            onAccept={acceptComment}
                        />
                    ))
                ) : (
                    <StateMessage className="comment-discussion__empty">
                        {messages.noComments}
                    </StateMessage>
                )}
            </div>
        </section>
    );
}

export default CommentDiscussion;
