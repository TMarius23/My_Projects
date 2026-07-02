export function isValidImageSource(value) {
    const source = value.trim();

    if (!source) {
        return false;
    }

    if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(source)) {
        return true;
    }

    try {
        const url = new URL(source);
        return ['http:', 'https:'].includes(url.protocol);
    } catch {
        return false;
    }
}

export function validateBugDraft({title, text, picture, tagIds}) {
    if (title.trim().length < 5) {
        return 'Title must have at least 5 characters.';
    }

    if (text.trim().length < 10) {
        return 'Description must have at least 10 characters.';
    }

    if (!isValidImageSource(picture)) {
        return 'Paste a screenshot or add a valid image URL.';
    }

    if (tagIds.length === 0) {
        return 'Select at least one tag.';
    }

    return '';
}

export function validateCommentDraft({comment, imageUrl}) {
    if (comment.trim().length < 3) {
        return 'Comment must have at least 3 characters.';
    }

    if (imageUrl.trim() && !isValidImageSource(imageUrl)) {
        return 'Add a valid image URL or leave the image field empty.';
    }

    return '';
}
