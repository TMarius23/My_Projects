import {beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import CommentItem from '@features/comments/components/CommentItem';

vi.mock('@features/auth/hooks/useAuth.js', () => ({
    useAuth: vi.fn(),
}));

const comment = {
    id: 10,
    comment: 'This is a bug fix suggestion',
    imageUrl: null,
    createdAt: '2024-01-15T10:00:00',
    voteCount: 2,
    currentUserVote: null,
    author: {id: 5, username: 'bob', score: 15},
};

const defaultProps = {
    comment,
    bugAuthorId: 1,
    isBugSolved: false,
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
    onVote: vi.fn(),
    onAccept: vi.fn(),
};

function renderComment(props = {}, authUser = {id: 99, role: 'USER'}) {
    useAuth.mockReturnValue({user: authUser});
    return render(<CommentItem {...defaultProps} {...props} />);
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('CommentItem — rendering', () => {
    it('renders the comment text', () => {
        renderComment();
        expect(screen.getByText('This is a bug fix suggestion')).toBeInTheDocument();
    });

    it('renders author name and score', () => {
        renderComment();
        expect(screen.getByText(/bob/)).toBeInTheDocument();
        expect(screen.getByText(/15 pts/)).toBeInTheDocument();
    });

    it('renders "Anonymous" when author is null', () => {
        renderComment({comment: {...comment, author: null}});
        expect(screen.getByText(/Anonymous/)).toBeInTheDocument();
    });

    it('renders image when imageUrl is provided', () => {
        renderComment({comment: {...comment, imageUrl: 'https://example.com/img.png'}});
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('does not render image when imageUrl is null', () => {
        renderComment();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
});

describe('CommentItem — permissions', () => {
    it('shows Edit and Delete buttons for the comment author', () => {
        renderComment({}, {id: 5, role: 'USER'});
        expect(screen.getByRole('button', {name: /edit/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument();
    });

    it('shows Edit and Delete buttons for a moderator', () => {
        renderComment({}, {id: 99, role: 'MODERATOR'});
        expect(screen.getByRole('button', {name: /edit/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument();
    });

    it('hides Edit and Delete buttons for other users', () => {
        renderComment({}, {id: 99, role: 'USER'});
        expect(screen.queryByRole('button', {name: /edit/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /delete/i})).not.toBeInTheDocument();
    });

    it('shows Accept solution button when user is bug author and bug is not solved', () => {
        renderComment({bugAuthorId: 99, isBugSolved: false}, {id: 99, role: 'USER'});
        expect(screen.getByRole('button', {name: /accept solution/i})).toBeInTheDocument();
    });

    it('hides Accept solution when bug is already solved', () => {
        renderComment({bugAuthorId: 99, isBugSolved: true}, {id: 99, role: 'USER'});
        expect(screen.queryByRole('button', {name: /accept solution/i})).not.toBeInTheDocument();
    });

    it('hides Accept solution for non-bug-authors', () => {
        renderComment({bugAuthorId: 1}, {id: 99, role: 'USER'});
        expect(screen.queryByRole('button', {name: /accept solution/i})).not.toBeInTheDocument();
    });

    it('disables voting on own comment', () => {
        renderComment({}, {id: 5, role: 'USER'});
        screen.getAllByRole('button').forEach((btn) => {
            if (btn.hasAttribute('aria-pressed')) {
                expect(btn).toBeDisabled();
            }
        });
    });
});

describe('CommentItem — edit mode', () => {
    it('shows textarea and Save/Cancel when Edit is clicked', () => {
        renderComment({}, {id: 5, role: 'USER'});
        fireEvent.click(screen.getByRole('button', {name: /edit/i}));
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /save/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /cancel/i})).toBeInTheDocument();
    });

    it('hides textarea and restores comment text when Cancel is clicked', () => {
        renderComment({}, {id: 5, role: 'USER'});
        fireEvent.click(screen.getByRole('button', {name: /edit/i}));
        fireEvent.click(screen.getByRole('button', {name: /cancel/i}));
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByText('This is a bug fix suggestion')).toBeInTheDocument();
    });

    it('calls onUpdate with comment id and new text when Save is clicked', async () => {
        const user = userEvent.setup();
        defaultProps.onUpdate.mockResolvedValue(true);
        renderComment({}, {id: 5, role: 'USER'});

        await user.click(screen.getByRole('button', {name: /edit/i}));
        await user.clear(screen.getByRole('textbox'));
        await user.type(screen.getByRole('textbox'), 'Updated text');
        await user.click(screen.getByRole('button', {name: /save/i}));

        await waitFor(() => {
            expect(defaultProps.onUpdate).toHaveBeenCalledWith(10, 'Updated text');
        });
        await waitFor(() => {
            expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        });
    });

    it('does not call onUpdate when Save is clicked with empty text', () => {
        renderComment({}, {id: 5, role: 'USER'});
        fireEvent.click(screen.getByRole('button', {name: /edit/i}));
        fireEvent.change(screen.getByRole('textbox'), {target: {value: '   '}});
        fireEvent.click(screen.getByRole('button', {name: /save/i}));
        expect(defaultProps.onUpdate).not.toHaveBeenCalled();
    });
});

describe('CommentItem — voting', () => {
    it('calls onVote with comment id and UPVOTE type', () => {
        renderComment({}, {id: 99, role: 'USER'});
        const [upvoteBtn] = screen.getAllByRole('button').filter((b) => b.hasAttribute('aria-pressed'));
        fireEvent.click(upvoteBtn);
        expect(defaultProps.onVote).toHaveBeenCalledWith(10, 'UPVOTE');
    });

    it('calls onAccept with comment id when Accept solution is clicked', () => {
        renderComment({bugAuthorId: 99}, {id: 99, role: 'USER'});
        fireEvent.click(screen.getByRole('button', {name: /accept solution/i}));
        expect(defaultProps.onAccept).toHaveBeenCalledWith(10);
    });
});
