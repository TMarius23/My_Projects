import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '@features/auth/components/LoginForm.jsx';
import loginConfig from '@features/auth/loginConfig.json';

const defaultProps = {
  config: loginConfig,
  email: '',
  password: '',
  isLoading: false,
  fieldErrors: {},
  errorMessage: '',
  onEmailChange: vi.fn(),
  onPasswordChange: vi.fn(),
  onSubmit: vi.fn(),
};

function renderForm(props = {}) {
  return render(<LoginForm {...defaultProps} {...props} />);
}

describe('LoginForm — rendering', () => {
  it('renders email and password inputs', () => {
    renderForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderForm();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('submit button is disabled when both fields are empty', () => {
    renderForm();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('submit button is disabled when email is empty', () => {
    renderForm({ password: 'secret' });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('submit button is disabled when password is empty', () => {
    renderForm({ email: 'a@b.com' });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('submit button is enabled when both fields have values', () => {
    renderForm({ email: 'a@b.com', password: 'secret' });
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('submit button is disabled when isLoading', () => {
    renderForm({ email: 'a@b.com', password: 'secret', isLoading: true });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading label when isLoading', () => {
    renderForm({ email: 'a@b.com', password: 'secret', isLoading: true });
    expect(screen.getByText(loginConfig.submittingLabel)).toBeInTheDocument();
  });

  it('shows submit label when not loading', () => {
    renderForm({ email: 'a@b.com', password: 'secret' });
    expect(screen.getByText(loginConfig.submitLabel)).toBeInTheDocument();
  });
});

describe('LoginForm — field errors', () => {
  it('shows email field error', () => {
    renderForm({ fieldErrors: { email: 'Email is required.' } });
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });

  it('shows password field error', () => {
    renderForm({ fieldErrors: { password: 'Password is required.' } });
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
  });

  it('does not show field errors when fieldErrors is empty', () => {
    renderForm();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('LoginForm — error message', () => {
  it('shows submit error message', () => {
    renderForm({ errorMessage: 'Invalid credentials.' });
    expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
  });

  it('does not render error paragraph when errorMessage is empty', () => {
    renderForm({ errorMessage: '' });
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
  });
});

describe('LoginForm — interactions', () => {
  it('calls onEmailChange when email input changes', () => {
    const onEmailChange = vi.fn();
    renderForm({ onEmailChange });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });
    expect(onEmailChange).toHaveBeenCalledWith('test@test.com');
  });

  it('calls onPasswordChange when password input changes', () => {
    const onPasswordChange = vi.fn();
    renderForm({ onPasswordChange });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'newpass' } });
    expect(onPasswordChange).toHaveBeenCalledWith('newpass');
  });

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = vi.fn();
    renderForm({ email: 'a@b.com', password: 'secret', onSubmit });
    fireEvent.submit(screen.getByRole('button').closest('form'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
