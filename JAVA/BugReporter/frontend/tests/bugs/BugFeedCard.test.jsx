import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import BugFeedCard from '@features/bugs/components/BugFeedCard';

const bug = {
    id: 1,
    title: 'Login crash',
    text: 'App crashes on login',
    status: 'RECEIVED',
    createdAt: '2024-01-15T10:00:00',
    voteCount: 3,
    currentUserVote: null,
    commentCount: 2,
    tags: [{id: 1, name: 'UI'}],
    tagLabels: ['UI'],
    author: {id: 2, username: 'alice', score: 10},
};

function renderCard(props = {}) {
    return render(
        <MemoryRouter>
            <BugFeedCard bug={bug} {...props} />
        </MemoryRouter>,
    );
}

describe('BugFeedCard — rendering', () => {
    it('renders the bug title as a link', () => {
        renderCard();
        expect(screen.getByRole('link', {name: /login crash/i})).toBeInTheDocument();
    });

    it('renders author name and score', () => {
        renderCard();
        expect(screen.getByText(/alice/)).toBeInTheDocument();
        expect(screen.getByText(/10 pts/)).toBeInTheDocument();
    });

    it('renders the vote count', () => {
        renderCard();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders the status badge (integration with BugStatusBadge)', () => {
        renderCard();
        expect(screen.getByText('RECEIVED')).toBeInTheDocument();
    });

    it('renders the comment count', () => {
        renderCard();
        expect(screen.getByText(/2 comments/i)).toBeInTheDocument();
    });
});

describe('BugFeedCard — voting (integration with VoteControl)', () => {
    it('disables both vote buttons when the bug belongs to the current user', () => {
        renderCard({currentUserId: 2});
        screen.getAllByRole('button').forEach((btn) => expect(btn).toBeDisabled());
    });

    it('enables vote buttons for other users', () => {
        renderCard({currentUserId: 99});
        screen.getAllByRole('button').forEach((btn) => expect(btn).not.toBeDisabled());
    });

    it('calls onVote(bugId, UPVOTE) when the upvote button is clicked', () => {
        const onVote = vi.fn();
        renderCard({currentUserId: 99, onVote});
        fireEvent.click(screen.getAllByRole('button')[0]);
        expect(onVote).toHaveBeenCalledWith(1, 'UPVOTE');
    });

    it('calls onVote(bugId, DOWNVOTE) when the downvote button is clicked', () => {
        const onVote = vi.fn();
        renderCard({currentUserId: 99, onVote});
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[buttons.length - 1]);
        expect(onVote).toHaveBeenCalledWith(1, 'DOWNVOTE');
    });

    it('marks the upvote button as selected when currentUserVote is UPVOTE', () => {
        renderCard({currentUserId: 99, bug: {...bug, currentUserVote: 'UPVOTE'}});
        expect(screen.getAllByRole('button')[0]).toHaveClass('is-selected');
    });
});
