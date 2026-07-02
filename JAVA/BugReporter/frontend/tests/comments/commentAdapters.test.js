import {describe, expect, it} from 'vitest';
import {adaptCommentForUi} from '@features/comments/utils/commentAdapters';

describe('adaptCommentForUi', () => {
    it('returns sensible defaults for an empty object', () => {
        const result = adaptCommentForUi({});
        expect(result.voteCount).toBe(0);
        expect(result.currentUserVote).toBeNull();
        expect(result.author).toBeNull();
    });

    it('preserves existing comment fields', () => {
        const result = adaptCommentForUi({id: 7, comment: 'Looks good', bugId: 3});
        expect(result.id).toBe(7);
        expect(result.comment).toBe('Looks good');
        expect(result.bugId).toBe(3);
    });

    it('keeps an existing voteCount', () => {
        expect(adaptCommentForUi({voteCount: -2}).voteCount).toBe(-2);
    });

    it('keeps an existing currentUserVote', () => {
        expect(adaptCommentForUi({currentUserVote: 'UPVOTE'}).currentUserVote).toBe('UPVOTE');
    });

    it('adds score: 0 to author when score is missing', () => {
        const result = adaptCommentForUi({author: {id: 5, username: 'bob'}});
        expect(result.author.score).toBe(0);
        expect(result.author.username).toBe('bob');
    });

    it('preserves author score when provided', () => {
        expect(adaptCommentForUi({author: {id: 5, username: 'bob', score: 7.5}}).author.score).toBe(7.5);
    });

    it('works with no arguments', () => {
        const result = adaptCommentForUi();
        expect(result.voteCount).toBe(0);
        expect(result.author).toBeNull();
    });
});
