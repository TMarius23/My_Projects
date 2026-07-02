import statusConfig from '../bugStatusConfig.json';
import './BugStatusBadge.css';

const DEFAULT_STATUS = 'RECEIVED';

function BugStatusBadge({status, className = ''}) {
    const config = statusConfig[status] ?? statusConfig[DEFAULT_STATUS];
    const classes = [
        'bug-status-badge',
        `bug-status-badge--${config.modifier}`,
        className,
    ].filter(Boolean).join(' ');

    return <span className={classes}>{config.label}</span>;
}

export default BugStatusBadge;
