import {Navigate} from 'react-router-dom';
import loginConfig from '../loginConfig.json';
import BugIcon from '@assets/icons/bug.svg?react';
import {useLoginForm} from '../hooks/useLoginForm.js';
import LoginHeader from '../components/LoginHeader.jsx';
import AccessRestrictedAlert from '../components/AccessRestrictedAlert.jsx';
import LoginForm from '../components/LoginForm.jsx';
import PageFooter from '../components/PageFooter.jsx';
import './LoginPage.css';

function LoginPage() {
    const {
        user,
        email,
        password,
        isLoading,
        fieldErrors,
        errorMessage,
        isAccessRestricted,
        setEmail,
        setPassword,
        handleSubmit,
    } = useLoginForm(loginConfig);

    if (!isLoading && user) {
        return <Navigate to="/bugs" replace/>;
    }

    return (
        <main className="login-page">
            <div className="login-page__inner">
                <LoginHeader title={loginConfig.title} subtitle={loginConfig.subtitle}/>

                {isAccessRestricted && (
                    <AccessRestrictedAlert
                        title={loginConfig.alertTitle}
                        message={loginConfig.alertMessage}
                    />
                )}

                <LoginForm
                    config={loginConfig}
                    email={email}
                    password={password}
                    isLoading={isLoading}
                    fieldErrors={fieldErrors}
                    errorMessage={errorMessage}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onSubmit={handleSubmit}
                />

                <PageFooter
                    registerPrompt={loginConfig.registerPrompt}
                    registerLinkLabel={loginConfig.registerLinkLabel}
                    registerHref={loginConfig.registerHref}
                />
            </div>

            <div className="login-page__corner-bug" aria-hidden="true">
                <BugIcon width="150" height="150"/>
            </div>
        </main>
    );
}

export default LoginPage;
