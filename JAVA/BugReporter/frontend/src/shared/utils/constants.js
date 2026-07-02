// In dev: empty -> Vite proxies '/api/*' to Spring backend (see vite.config.js)
// In prod: VITE_API_URL from .env.production -> points to https://api.vasilebud.online
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const ENDPOINTS = {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/me',

    bugs: '/api/bugs',
    bug: (id) => `/api/bugs/${id}`,
    bugTags: (bugId) => `/api/bugs/${bugId}/tags`,
    bugTag: (bugId, tagId) => `/api/bugs/${bugId}/tags/${tagId}`,
    acceptComment: (bugId, commentId) => `/api/bugs/${bugId}/comments/${commentId}/accept`,

    comments: '/api/comments',
    comment: (id) => `/api/comments/${id}`,
    commentsByBug: (bugId) => `/api/comments/bug/${bugId}`,

    tags: '/api/tags',
    tagUsage: '/api/tags/usage',

    users: '/api/users',
    user: (id) => `/api/users/${id}`,
    userTopHunters: '/api/users/top-hunters',
    banUser: (id) => `/api/users/${id}/ban`,
    unbanUser: (id) => `/api/users/${id}/unban`,

    voteBug: '/api/votes/bug',
    voteComment: '/api/votes/comment',
};
