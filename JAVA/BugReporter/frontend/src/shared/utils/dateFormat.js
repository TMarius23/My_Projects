export function formatRelativeDate(dateString) {
    if (!dateString) return 'recently';

    const date = new Date(dateString);
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const timeStr = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return `yesterday, ${timeStr}`;
    if (diffInDays < 7) return `${diffInDays} days ago, ${timeStr}`;

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }) + `, ${timeStr}`;
}

export function formatExactDate(dateString) {
    if (!dateString) return '';

    return new Date(dateString).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
