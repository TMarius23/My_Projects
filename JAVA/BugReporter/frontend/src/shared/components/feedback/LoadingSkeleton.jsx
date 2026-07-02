import './LoadingSkeleton.css';

function LoadingSkeleton({count = 3, variant = 'card', className = ''}) {
    return (
        <div className={['loading-skeleton-list', className].filter(Boolean).join(' ')} aria-hidden="true">
            {Array.from({length: count}, (_, index) => (
                <div className={`loading-skeleton loading-skeleton--${variant}`} key={index}>
                    <span/>
                    <span/>
                    <span/>
                </div>
            ))}
        </div>
    );
}

export default LoadingSkeleton;
