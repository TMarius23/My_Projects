export function adaptUserForUi(user = {}) {
    return {
        ...user,
        score: user.score ?? 0,
        role: user.role ?? 'USER',
        banned: user.banned ?? false,
    };
}
