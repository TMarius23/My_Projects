import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import FormField from '@shared/components/forms/FormField.jsx';

describe('FormField — rendering', () => {
    it('renders a label with the given text', () => {
        render(<FormField id="email" label="EMAIL" value="" onChange={vi.fn()}/>);
        expect(screen.getByLabelText('EMAIL')).toBeInTheDocument();
    });

    it('associates label with input via htmlFor/id', () => {
        render(<FormField id="email" label="EMAIL" value="" onChange={vi.fn()}/>);
        const input = screen.getByLabelText('EMAIL');
        expect(input.id).toBe('email');
    });

    it('renders the correct input type', () => {
        render(<FormField id="pw" label="PASSWORD" type="password" value="" onChange={vi.fn()}/>);
        expect(screen.getByLabelText('PASSWORD')).toHaveAttribute('type', 'password');
    });

    it('renders placeholder text', () => {
        render(<FormField id="email" label="EMAIL" value="" onChange={vi.fn()} placeholder="e.g. user@example.com"/>);
        expect(screen.getByPlaceholderText('e.g. user@example.com')).toBeInTheDocument();
    });

    it('renders the current value', () => {
        render(<FormField id="email" label="EMAIL" value="test@test.com" onChange={vi.fn()}/>);
        expect(screen.getByLabelText('EMAIL')).toHaveValue('test@test.com');
    });

    it('renders rightSlot content when provided', () => {
        render(
            <FormField
                id="email"
                label="EMAIL"
                value=""
                onChange={vi.fn()}
                rightSlot={<a href="/forgot">Forgot?</a>}
            />,
        );
        expect(screen.getByRole('link', {name: 'Forgot?'})).toBeInTheDocument();
    });

    it('renders icon when iconName is provided', () => {
        const {container} = render(
            <FormField id="email" label="EMAIL" value="" onChange={vi.fn()} iconName="user"/>,
        );
        expect(container.querySelector('.form-field__icon')).toBeInTheDocument();
    });

    it('does not render icon when iconName is not provided', () => {
        const {container} = render(<FormField id="email" label="EMAIL" value="" onChange={vi.fn()}/>);
        expect(container.querySelector('.form-field__icon')).not.toBeInTheDocument();
    });
});

describe('FormField — interactions', () => {
    it('calls onChange with the input value', () => {
        const onChange = vi.fn();
        render(<FormField id="email" label="EMAIL" value="" onChange={onChange}/>);
        fireEvent.change(screen.getByLabelText('EMAIL'), {target: {value: 'new@value.com'}});
        expect(onChange).toHaveBeenCalledWith('new@value.com');
    });
});

describe('FormField — disabled state', () => {
    it('disables the input when disabled prop is true', () => {
        render(<FormField id="email" label="EMAIL" value="" onChange={vi.fn()} disabled/>);
        expect(screen.getByLabelText('EMAIL')).toBeDisabled();
    });

    it('input is not disabled by default', () => {
        render(<FormField id="email" label="EMAIL" value="" onChange={vi.fn()}/>);
        expect(screen.getByLabelText('EMAIL')).not.toBeDisabled();
    });
});
