import {beforeEach, describe, expect, it, vi} from 'vitest';
import {apiRequest} from '@shared/api/client.js';
import {voteService} from '@features/votes/services/voteService.js';

vi.mock('@shared/api/client.js', () => ({
    apiRequest: vi.fn(),
}));

describe('voteService — API mocking', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('voteBug sends a POST to /api/votes/bug with the correct body', async () => {
        apiRequest.mockResolvedValue({success: true});

        await voteService.voteBug({bugId: 42, type: 'UPVOTE'});

        expect(apiRequest).toHaveBeenCalledWith('/api/votes/bug', {
            method: 'POST',
            body: {bugId: 42, type: 'UPVOTE'},
        });
    });

    it('voteBug returns the server response', async () => {
        apiRequest.mockResolvedValue({success: true, data: {id: 10}});

        const result = await voteService.voteBug({bugId: 1, type: 'DOWNVOTE'});

        expect(result).toEqual({success: true, data: {id: 10}});
    });

    it('voteComment sends a POST to /api/votes/comment with the correct body', async () => {
        apiRequest.mockResolvedValue({success: true});

        await voteService.voteComment({commentId: 7, type: 'DOWNVOTE'});

        expect(apiRequest).toHaveBeenCalledWith('/api/votes/comment', {
            method: 'POST',
            body: {commentId: 7, type: 'DOWNVOTE'},
        });
    });

    it('voteComment returns the server response', async () => {
        apiRequest.mockResolvedValue({success: false, error: 'Not authenticated'});

        const result = await voteService.voteComment({commentId: 3, type: 'UPVOTE'});

        expect(result.success).toBe(false);
        expect(result.error).toBe('Not authenticated');
    });
});
