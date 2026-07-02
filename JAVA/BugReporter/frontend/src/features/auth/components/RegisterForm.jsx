import FormField from '@shared/components/forms/FormField.jsx';
import ArrowRightIcon from '@assets/icons/arrow-right.svg?react';
import './LoginForm.css';

function RegisterForm({
                          config,
                          username,
                          email,
                          phoneNumber,
                          password,
                          confirmPassword,
                          isLoading,
                          fieldErrors,
                          errorMessage,
                          onUsernameChange,
                          onEmailChange,
                          onPhoneNumberChange,
                          onPasswordChange,
                          onConfirmPasswordChange,
                          onSubmit,
                      }) {
    const {fields, submitLabel, submittingLabel} = config;
    const isSubmitDisabled =
        isLoading ||
        username.trim().length === 0 ||
        email.trim().length === 0 ||
        phoneNumber.trim().length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0;

    return (
        <form className="login-form" onSubmit={onSubmit} noValidate>
            <FormField
                id="username"
                label={fields.username.label}
                type="text"
                value={username}
                onChange={onUsernameChange}
                placeholder={fields.username.placeholder}
                iconName={fields.username.icon}
                monospacePlaceholder
                autoComplete="username"
                disabled={isLoading}
                required
            />
            {fieldErrors.username && (
                <p className="login-form__field-error" role="alert">
                    {fieldErrors.username}
                </p>
            )}

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
                id="phoneNumber"
                label={fields.phoneNumber.label}
                type="tel"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
                placeholder={fields.phoneNumber.placeholder}
                iconName={fields.phoneNumber.icon}
                monospacePlaceholder
                autoComplete="tel"
                disabled={isLoading}
                required
            />
            {fieldErrors.phoneNumber && (
                <p className="login-form__field-error" role="alert">
                    {fieldErrors.phoneNumber}
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
                autoComplete="new-password"
                disabled={isLoading}
                required
            />
            {fieldErrors.password && (
                <p className="login-form__field-error" role="alert">
                    {fieldErrors.password}
                </p>
            )}

            <FormField
                id="confirmPassword"
                label={fields.confirmPassword.label}
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                placeholder={fields.confirmPassword.placeholder}
                iconName={fields.confirmPassword.icon}
                autoComplete="new-password"
                disabled={isLoading}
                required
            />
            {fieldErrors.confirmPassword && (
                <p className="login-form__field-error" role="alert">
                    {fieldErrors.confirmPassword}
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

export default RegisterForm;
