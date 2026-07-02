export const authKeys = {
    root: ['auth'],
    me: ['auth', 'me'],
};

export const bugKeys = {
    root: ['bugs'],
    lists: ['bugs', 'list'],
    list: (filters) => ['bugs', 'list', filters],
    detail: (id) => ['bugs', 'detail', String(id)],
};

export const commentKeys = {
    root: ['comments'],
    byBug: (bugId) => ['comments', 'bug', String(bugId)],
    byBugSorted: (bugId, sortBy) => ['comments', 'bug', String(bugId), sortBy],
};

export const tagKeys = {
    root: ['tags'],
    list: ['tags'],
    usage: ['tagUsage'],
};

export const userKeys = {
    root: ['users'],
    list: (filters) => ['users', filters],
    topHunters: ['userTopHunters'],
};
