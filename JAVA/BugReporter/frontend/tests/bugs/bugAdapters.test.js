import {describe, expect, it} from 'vitest';
import {adaptBugForUi} from '@features/bugs/utils/bugAdapters';

describe('adaptBugForUi', () => {
    it('returns sensible defaults for an empty object', () => {
        const result = adaptBugForUi({});
        expect(result.voteCount).toBe(0);
        expect(result.currentUserVote).toBeNull();
        expect(result.comments).toEqual([]);
        expect(result.commentCount).toBe(0);
        expect(result.tags).toEqual([]);
        expect(result.tagIds).toEqual([]);
        expect(result.tagLabels).toEqual([]);
        expect(result.author).toBeNull();
    });

    it('preserves existing bug fields', () => {
        const result = adaptBugForUi({id: 42, title: 'Login crash', status: 'RECEIVED'});
        expect(result.id).toBe(42);
        expect(result.title).toBe('Login crash');
        expect(result.status).toBe('RECEIVED');
    });

    it('keeps an existing voteCount', () => {
        expect(adaptBugForUi({voteCount: 5}).voteCount).toBe(5);
    });

    it('maps string tags to {id, name} objects', () => {
        const result = adaptBugForUi({tags: ['UI', 'backend']});
        expect(result.tags).toEqual([{id: 'UI', name: 'UI'}, {id: 'backend', name: 'backend'}]);
        expect(result.tagIds).toEqual(['UI', 'backend']);
        expect(result.tagLabels).toEqual(['UI', 'BACKEND']);
    });

    it('keeps object tags as-is and builds tagIds and tagLabels', () => {
        const tags = [{id: 1, name: 'UI'}, {id: 2, name: 'backend'}];
        const result = adaptBugForUi({tags});
        expect(result.tags).toEqual(tags);
        expect(result.tagIds).toEqual([1, 2]);
        expect(result.tagLabels).toEqual(['UI', 'BACKEND']);
    });

    it('adds score: 0 to author when score is missing', () => {
        const result = adaptBugForUi({author: {id: 1, username: 'alice'}});
        expect(result.author.score).toBe(0);
        expect(result.author.username).toBe('alice');
    });

    it('preserves author score when provided', () => {
        expect(adaptBugForUi({author: {id: 1, username: 'alice', score: 12.5}}).author.score).toBe(12.5);
    });

    it('derives commentCount from comments array when not provided', () => {
        expect(adaptBugForUi({comments: ['a', 'b', 'c']}).commentCount).toBe(3);
    });

    it('uses explicit commentCount over comments length', () => {
        expect(adaptBugForUi({comments: ['a'], commentCount: 10}).commentCount).toBe(10);
    });

    it('works with no arguments', () => {
        const result = adaptBugForUi();
        expect(result.voteCount).toBe(0);
        expect(result.author).toBeNull();
    });
});
