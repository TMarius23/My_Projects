import './VoteControl.css';

function VoteControl({
                         className = '',
                         value = 0,
                         currentVote = null,
                         disabled = false,
                         disabledReason = 'Voting is not available.',
                         upLabel = 'Upvote',
                         downLabel = 'Downvote',
                         onVote,
                     }) {
    const classes = ['vote-control', className].filter(Boolean).join(' ');
    const upSelected = currentVote === 'UPVOTE';
    const downSelected = currentVote === 'DOWNVOTE';

    function vote(type) {
        if (!disabled) {
            onVote?.(type);
        }
    }

    return (<aside className={classes}>
        <button
            className={upSelected ? 'is-selected' : ''}
            type="button"
            aria-label={disabled ? disabledReason : upLabel}
            aria-pressed={upSelected}
            disabled={disabled}
            title={disabled ? disabledReason : upLabel}
            onClick={() => vote('UPVOTE')}
        >
            <span className="vote-arrow vote-arrow--up" aria-hidden="true"/>
        </button>
        <strong>{value ?? 0}</strong>
        <button
            className={downSelected ? 'is-selected' : ''}
            type="button"
            aria-label={disabled ? disabledReason : downLabel}
            aria-pressed={downSelected}
            disabled={disabled}
            title={disabled ? disabledReason : downLabel}
            onClick={() => vote('DOWNVOTE')}
        >
            <span className="vote-arrow vote-arrow--down" aria-hidden="true"/>
        </button>
    </aside>);
}

export default VoteControl;
