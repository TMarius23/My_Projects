import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import AccessRestrictedAlert from '@features/auth/components/AccessRestrictedAlert.jsx';

describe('AccessRestrictedAlert', () => {
    it('renders the title', () => {
        render(<AccessRestrictedAlert title="Account suspended" message="Contact an admin."/>);
        expect(screen.getByText('Account suspended')).toBeInTheDocument();
    });

    it('renders the message', () => {
        render(<AccessRestrictedAlert title="Account suspended" message="Contact an admin."/>);
        expect(screen.getByText('Contact an admin.')).toBeInTheDocument();
    });

    it('has role="alert" for screen readers', () => {
        render(<AccessRestrictedAlert title="Account suspended" message="Contact an admin."/>);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders different title and message', () => {
        render(<AccessRestrictedAlert title="Access Denied" message="You do not have permission."/>);
        expect(screen.getByText('Access Denied')).toBeInTheDocument();
        expect(screen.getByText('You do not have permission.')).toBeInTheDocument();
    });
});
