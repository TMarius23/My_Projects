import {useCallback, useState} from 'react';

export function useActionMessage() {
    const [message, setMessage] = useState('');
    const clearMessage = useCallback(() => setMessage(''), []);

    return {
        message,
        setMessage,
        clearMessage,
    };
}
