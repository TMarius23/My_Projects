import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import StateMessage from '@shared/components/feedback/StateMessage.jsx';

describe('StateMessage — rendering', () => {
    it('renders children', () => {
        render(<StateMessage>Something went wrong.</StateMessage>);
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });

    it('applies the default tone class', () => {
        const {container} = render(<StateMessage>msg</StateMessage>);
        expect(container.firstChild).toHaveClass('state-message--default');
    });

    it('applies the error tone class', () => {
        const {container} = render(<StateMessage tone="error">msg</StateMessage>);
        expect(container.firstChild).toHaveClass('state-message--error');
    });

    it('always has the base state-message class', () => {
        const {container} = render(<StateMessage>msg</StateMessage>);
        expect(container.firstChild).toHaveClass('state-message');
    });

    it('applies a custom className', () => {
        const {container} = render(<StateMessage className="my-class">msg</StateMessage>);
        expect(container.firstChild).toHaveClass('my-class');
    });
});

describe('StateMessage — ARIA role', () => {
    it('has role="alert" when tone is "error"', () => {
        render(<StateMessage tone="error">Error!</StateMessage>);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has no role when tone is "default"', () => {
        const {container} = render(<StateMessage>Info</StateMessage>);
        expect(container.firstChild).not.toHaveAttribute('role');
    });

    it('respects an explicit role prop', () => {
        render(<StateMessage role="status">Loading...</StateMessage>);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
