import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import PageSpinner from '@shared/components/feedback/PageSpinner.jsx';

describe('PageSpinner', () => {
    it('renders with role="status"', () => {
        render(<PageSpinner/>);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has an accessible label', () => {
        render(<PageSpinner/>);
        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('renders the spinner ring element', () => {
        const {container} = render(<PageSpinner/>);
        expect(container.querySelector('.page-spinner__ring')).toBeInTheDocument();
    });

    it('renders the outer container with page-spinner class', () => {
        const {container} = render(<PageSpinner/>);
        expect(container.firstChild).toHaveClass('page-spinner');
    });
});
