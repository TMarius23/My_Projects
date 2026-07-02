import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './useAuth.js';

function validateLogin(values, rules) {
    const errors = {};
    const email = values.email.trim();
    const emailRules = rules.email;

    if (email.length === 0) {
        errors.email = emailRules.messages.required;
    } else if (!new RegExp(emailRules.pattern).test(email)) {
        errors.email = emailRules.messages.pattern;
    }

    const passwordRules = rules.password;
    if (values.password.length === 0) {
        errors.password = passwordRules.messages.required;
    } else if (values.password.length < passwordRules.minLength) {
        errors.password = passwordRules.messages.minLength;
    }

    return errors;
}

export function useLoginForm(config) {
    const {user, login, isLoading} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isAccessRestricted, setIsAccessRestricted] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('');

        const errors = validateLogin({email, password}, config.validation);
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const result = await login({
            email: email.trim(),
            password,
        });

        if (result.success) {
            setIsAccessRestricted(false);
            navigate('/bugs');
            return;
        }

        if (result.status === 403 && result.error?.toLowerCase().includes('banned')) {
            setIsAccessRestricted(true);
            setErrorMessage(result.error);
            return;
        }

        setIsAccessRestricted(false);
        if (result.status === 401) {
            setErrorMessage(result.error || config.errors.invalidCredentials);
        } else if (result.status === 0) {
            setErrorMessage(config.errors.network);
        } else {
            setErrorMessage(result.error || config.errors.unknown);
        }
    }

    return {
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
    };
}
