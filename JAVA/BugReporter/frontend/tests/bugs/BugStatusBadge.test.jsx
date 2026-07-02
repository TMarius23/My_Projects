import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import BugStatusBadge from '@features/bugs/components/BugStatusBadge';

describe('BugStatusBadge', () => {
    it('renders RECEIVED label', () => {
        render(<BugStatusBadge status="RECEIVED"/>);
        expect(screen.getByText('RECEIVED')).toBeInTheDocument();
    });

    it('renders IN PROGRESS label', () => {
        render(<BugStatusBadge status="IN_PROGRESS"/>);
        expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    });

    it('renders SOLVED label', () => {
        render(<BugStatusBadge status="SOLVED"/>);
        expect(screen.getByText('SOLVED')).toBeInTheDocument();
    });

    it('applies the correct modifier class for RECEIVED', () => {
        const {container} = render(<BugStatusBadge status="RECEIVED"/>);
        expect(container.firstChild).toHaveClass('bug-status-badge--received');
    });

    it('applies the correct modifier class for IN_PROGRESS', () => {
        const {container} = render(<BugStatusBadge status="IN_PROGRESS"/>);
        expect(container.firstChild).toHaveClass('bug-status-badge--in_progress');
    });

    it('applies the correct modifier class for SOLVED', () => {
        const {container} = render(<BugStatusBadge status="SOLVED"/>);
        expect(container.firstChild).toHaveClass('bug-status-badge--solved');
    });

    it('falls back to RECEIVED for an unknown status', () => {
        render(<BugStatusBadge status="UNKNOWN_STATUS"/>);
        expect(screen.getByText('RECEIVED')).toBeInTheDocument();
    });

    it('applies an extra className when provided', () => {
        const {container} = render(<BugStatusBadge status="SOLVED" className="extra"/>);
        expect(container.firstChild).toHaveClass('extra');
    });
});
