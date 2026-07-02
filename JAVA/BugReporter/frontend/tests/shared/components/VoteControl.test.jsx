import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import VoteControl from '@shared/components/voting/VoteControl';

function renderVote(props = {}) {
    return render(<VoteControl onVote={vi.fn()} {...props} />);
}

describe('VoteControl — rendering', () => {
    it('renders the vote count', () => {
        renderVote({value: 7});
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('renders 0 when value is not provided', () => {
        renderVote();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders upvote and downvote buttons', () => {
        renderVote();
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('uses upLabel as aria-label for upvote button when not disabled', () => {
        renderVote({upLabel: 'Upvote bug'});
        expect(screen.getByRole('button', {name: 'Upvote bug'})).toBeInTheDocument();
    });

    it('uses downLabel as aria-label for downvote button when not disabled', () => {
        renderVote({downLabel: 'Downvote bug'});
        expect(screen.getByRole('button', {name: 'Downvote bug'})).toBeInTheDocument();
    });

    it('applies extra className to the wrapper', () => {
        const {container} = renderVote({className: 'custom'});
        expect(container.firstChild).toHaveClass('vote-control', 'custom');
    });
});

describe('VoteControl — selection state', () => {
    it('marks upvote button as selected when currentVote is UPVOTE', () => {
        renderVote({currentVote: 'UPVOTE'});
        const [upBtn] = screen.getAllByRole('button');
        expect(upBtn).toHaveClass('is-selected');
        expect(upBtn).toHaveAttribute('aria-pressed', 'true');
    });

    it('marks downvote button as selected when currentVote is DOWNVOTE', () => {
        renderVote({currentVote: 'DOWNVOTE'});
        const buttons = screen.getAllByRole('button');
        expect(buttons[1]).toHaveClass('is-selected');
        expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    });

    it('marks neither button as selected when currentVote is null', () => {
        renderVote({currentVote: null});
        screen.getAllByRole('button').forEach((btn) => {
            expect(btn).not.toHaveClass('is-selected');
            expect(btn).toHaveAttribute('aria-pressed', 'false');
        });
    });
});

describe('VoteControl — disabled state', () => {
    it('disables both buttons when disabled=true', () => {
        renderVote({disabled: true});
        screen.getAllByRole('button').forEach((btn) => expect(btn).toBeDisabled());
    });

    it('uses disabledReason as aria-label when disabled', () => {
        renderVote({disabled: true, disabledReason: 'Cannot vote on own bug'});
        screen.getAllByRole('button', {name: 'Cannot vote on own bug'}).forEach((btn) => {
            expect(btn).toBeInTheDocument();
        });
    });

    it('does not call onVote when disabled and button is clicked', () => {
        const onVote = vi.fn();
        renderVote({disabled: true, onVote});
        screen.getAllByRole('button').forEach((btn) => fireEvent.click(btn));
        expect(onVote).not.toHaveBeenCalled();
    });
});

describe('VoteControl — interactions', () => {
    it('calls onVote with UPVOTE when upvote button is clicked', () => {
        const onVote = vi.fn();
        renderVote({onVote});
        fireEvent.click(screen.getAllByRole('button')[0]);
        expect(onVote).toHaveBeenCalledWith('UPVOTE');
    });

    it('calls onVote with DOWNVOTE when downvote button is clicked', () => {
        const onVote = vi.fn();
        renderVote({onVote});
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[buttons.length - 1]);
        expect(onVote).toHaveBeenCalledWith('DOWNVOTE');
    });

    it('does not throw when onVote is not provided', () => {
        render(<VoteControl/>);
        expect(() => fireEvent.click(screen.getAllByRole('button')[0])).not.toThrow();
    });
});
