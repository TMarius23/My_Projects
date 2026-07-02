import {useState} from 'react';
import {getPastedImageDataUrl} from '@shared/utils/clipboardImages.js';
import {validateCommentDraft} from '@shared/utils/validation.js';
import {messages} from '@shared/utils/messages.js';

export function useCommentComposer({bugId, onCreate}) {
    const [comment, setComment] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
    const [message, setMessage] = useState('');

    async function submit() {
        setMessage('');

        const validationMessage = validateCommentDraft({comment, imageUrl});
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }

        const result = await onCreate({
            bugId,
            comment: comment.trim(),
            imageUrl: imageUrl.trim() || null,
        });

        if (result.success) {
            setComment('');
            setImageUrl('');
            setIsAttachmentOpen(false);
        } else {
            setMessage(result.error || messages.createCommentFailed);
        }
    }

    async function handleImagePaste(event) {
        const imageDataUrl = await getPastedImageDataUrl(event);
        if (imageDataUrl) {
            setImageUrl(imageDataUrl);
            setIsAttachmentOpen(true);
            setMessage('');
        }
    }

    return {
        comment,
        setComment,
        imageUrl,
        setImageUrl,
        isAttachmentOpen,
        setIsAttachmentOpen,
        message,
        submit,
        handleImagePaste,
    };
}
