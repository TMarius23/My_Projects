import FormField from '@shared/components/forms/FormField.jsx';
import ArrowRightIcon from '@assets/icons/arrow-right.svg?react';
import './LoginForm.css';

function LoginForm({
                       config,
                       email,
                       password,
                       isLoading,
                       fieldErrors,
                       errorMessage,
                       onEmailChange,
                       onPasswordChange,
                       onSubmit,
                   }) {
    const {fields, submitLabel, submittingLabel} = config;
    const isSubmitDisabled =
        isLoading || email.trim().length === 0 || password.length === 0;

    return (
        <form className="login-form" onSubmit={onSubmit} noValidate>
            <FormField
                id="email"
                label={fields.email.label}
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder={fields.email.placeholder}
                iconName={fields.email.icon}
                monospacePlaceholder
                autoComplete="email"
                disabled={isLoading}
                required
            />
            {fieldErrors.email && (
                <p className="login-form__field-error" role="alert">
                    {fieldErrors.email}
                </p>
            )}

            <FormField
                id="password"
                label={fields.password.label}
                type="password"
                value={password}
                onChange={onPasswordChange}
                placeholder={fields.password.placeholder}
                iconName={fields.password.icon}
                autoComplete="current-password"
                disabled={isLoading}
                required
            />
            {fieldErrors.password && (
                <p className="login-form__field-error" role="alert">
                    {fieldErrors.password}
                </p>
            )}

            {errorMessage && (
                <p className="login-form__submit-error" role="alert">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                className="login-form__submit"
                disabled={isSubmitDisabled}
            >
                <span>{isLoading ? submittingLabel : submitLabel}</span>
                <ArrowRightIcon width="14" height="14" aria-hidden="true"/>
            </button>
        </form>
    );
}

export default LoginForm;
