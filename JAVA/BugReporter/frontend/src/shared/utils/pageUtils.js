export function emptyPage(size = 10) {
    return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size,
        number: 0,
        first: true,
        last: true,
    };
}
