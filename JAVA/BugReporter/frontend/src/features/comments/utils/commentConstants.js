export const COMMENT_SORT = {
    highestVotes: 'HIGHEST_VOTES',
    lowestVotes: 'LOWEST_VOTES',
    newest: 'NEWEST',
    oldest: 'OLDEST',
};

export const DEFAULT_COMMENT_SORT = COMMENT_SORT.highestVotes;

export const COMMENT_SORT_OPTIONS = [
    {value: COMMENT_SORT.highestVotes, label: 'Highest Votes'},
    {value: COMMENT_SORT.lowestVotes, label: 'Lowest Votes'},
    {value: COMMENT_SORT.newest, label: 'Newest'},
    {value: COMMENT_SORT.oldest, label: 'Oldest'},
];
