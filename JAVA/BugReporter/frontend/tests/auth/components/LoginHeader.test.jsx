import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import LoginHeader from '@features/auth/components/LoginHeader.jsx';

describe('LoginHeader', () => {
    it('renders the title', () => {
        render(<LoginHeader title="Bug Reporter" subtitle="Sign in to continue"/>);
        expect(screen.getByRole('heading', {name: 'Bug Reporter'})).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
        render(<LoginHeader title="Bug Reporter" subtitle="Sign in to continue"/>);
        expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
    });

    it('renders the logo area as aria-hidden', () => {
        const {container} = render(<LoginHeader title="Bug Reporter" subtitle="Sign in to continue"/>);
        const logo = container.querySelector('[aria-hidden="true"]');
        expect(logo).toBeInTheDocument();
    });
});
