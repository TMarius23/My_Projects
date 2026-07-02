import BugIcon from '@assets/icons/bug.svg?react';
import './LoginHeader.css';

function LoginHeader({title, subtitle}) {
    return (
        <header className="login-header">
            <div className="login-header__logo" aria-hidden="true">
                <BugIcon width="24" height="24"/>
            </div>
            <h1 className="login-header__title">{title}</h1>
            <p className="login-header__subtitle">{subtitle}</p>
        </header>
    );
}

export default LoginHeader;
