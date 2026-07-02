import './StateMessage.css';

function StateMessage({
                          children,
                          className = '',
                          tone = 'default',
                          role,
                      }) {
    const messageRole = role ?? (tone === 'error' ? 'alert' : undefined);
    const classes = ['state-message', `state-message--${tone}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} role={messageRole}>
            {children}
        </div>
    );
}

export default StateMessage;
