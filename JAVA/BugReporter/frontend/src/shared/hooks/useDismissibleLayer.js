import {useEffect, useRef} from 'react';

export function useDismissibleLayer(isOpen, onDismiss) {
    const ref = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        function handlePointerDown(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onDismiss();
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onDismiss();
            }
        }

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onDismiss]);

    return ref;
}
