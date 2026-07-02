import registerConfig from '../registerConfig.json';
import BugIcon from '@assets/icons/bug.svg?react';
import {useRegisterForm} from '../hooks/useRegisterForm.js';
import LoginHeader from '../components/LoginHeader.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import PageFooter from '../components/PageFooter.jsx';
import './RegisterPage.css';

function RegisterPage() {
    const {
        username,
        email,
        phoneNumber,
        password,
        confirmPassword,
        isLoading,
        fieldErrors,
        errorMessage,
        setUsername,
        setEmail,
        setPhoneNumber,
        setPassword,
        setConfirmPassword,
        handleSubmit,
    } = useRegisterForm(registerConfig);

    return (
        <main className="register-page">
            <div className="register-page__inner">
                <LoginHeader title={registerConfig.title} subtitle={registerConfig.subtitle}/>

                <RegisterForm
                    config={registerConfig}
                    username={username}
                    email={email}
                    phoneNumber={phoneNumber}
                    password={password}
                    confirmPassword={confirmPassword}
                    isLoading={isLoading}
                    fieldErrors={fieldErrors}
                    errorMessage={errorMessage}
                    onUsernameChange={setUsername}
                    onEmailChange={setEmail}
                    onPhoneNumberChange={setPhoneNumber}
                    onPasswordChange={setPassword}
                    onConfirmPasswordChange={setConfirmPassword}
                    onSubmit={handleSubmit}
                />

                <PageFooter
                    registerPrompt={registerConfig.loginPrompt}
                    registerLinkLabel={registerConfig.loginLinkLabel}
                    registerHref={registerConfig.loginHref}
                />
            </div>

            <div className="register-page__corner-bug" aria-hidden="true">
                <BugIcon width="150" height="150"/>
            </div>
        </main>
    );
}

export default RegisterPage;
