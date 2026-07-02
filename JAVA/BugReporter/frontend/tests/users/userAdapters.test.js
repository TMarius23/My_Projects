import {describe, expect, it} from 'vitest';
import {adaptUserForUi} from '@features/users/utils/userAdapters';

describe('adaptUserForUi', () => {
    it('returns sensible defaults for an empty object', () => {
        const result = adaptUserForUi({});
        expect(result.score).toBe(0);
        expect(result.role).toBe('USER');
        expect(result.banned).toBe(false);
    });

    it('preserves existing user fields', () => {
        const result = adaptUserForUi({id: 1, username: 'alice', email: 'alice@example.com'});
        expect(result.id).toBe(1);
        expect(result.username).toBe('alice');
        expect(result.email).toBe('alice@example.com');
    });

    it('keeps an existing score', () => {
        expect(adaptUserForUi({score: 42.5}).score).toBe(42.5);
    });

    it('keeps an existing role', () => {
        expect(adaptUserForUi({role: 'MODERATOR'}).role).toBe('MODERATOR');
    });

    it('keeps banned: true when provided', () => {
        expect(adaptUserForUi({banned: true}).banned).toBe(true);
    });

    it('works with no arguments', () => {
        const result = adaptUserForUi();
        expect(result.score).toBe(0);
        expect(result.role).toBe('USER');
        expect(result.banned).toBe(false);
    });
});
