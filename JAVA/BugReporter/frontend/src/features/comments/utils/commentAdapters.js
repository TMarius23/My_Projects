export function adaptCommentForUi(comment = {}) {
    return {
        ...comment,
        voteCount: comment.voteCount ?? 0,
        currentUserVote: comment.currentUserVote ?? null,
        author: comment.author ? {
            ...comment.author,
            score: comment.author.score ?? 0,
        } : null,
    };
}
