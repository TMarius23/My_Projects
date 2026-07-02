export function adaptBugForUi(bug = {}) {
    const tags = (bug.tags ?? []).map((tag) => (
        typeof tag === 'string' ? {id: tag, name: tag} : tag
    ));
    const voteCount = bug.voteCount ?? 0;

    return {
        ...bug,
        voteCount,
        currentUserVote: bug.currentUserVote ?? null,
        comments: bug.comments ?? [],
        commentCount: bug.commentCount ?? (bug.comments?.length ?? 0),
        author: bug.author ? {
            ...bug.author,
            score: bug.author.score ?? 0,
        } : null,
        tags,
        tagIds: tags.map((tag) => tag.id),
        tagLabels: tags.map((tag) => tag.name.toUpperCase()),
    };
}
