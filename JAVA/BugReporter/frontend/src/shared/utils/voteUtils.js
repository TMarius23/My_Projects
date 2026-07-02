function getVoteValue(type) {
    if (type === 'UPVOTE') return 1;
    if (type === 'DOWNVOTE') return -1;
    return 0;
}

export function applyVote(entity, type) {
    if (!entity) return entity;
    const previousVote = entity.currentUserVote ?? null;
    const nextVote = previousVote === type ? null : type;
    const delta = getVoteValue(nextVote) - getVoteValue(previousVote);
    return {
        ...entity,
        voteCount: (entity.voteCount ?? 0) + delta,
        currentUserVote: nextVote,
    };
}
