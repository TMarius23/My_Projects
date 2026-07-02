import './BugReportActions.css';

function BugReportActions({isEditMode, isSaving, onCancel}) {
    return (
        <footer className="bug-report-actions">
            <button type="button" className="bug-report-secondary" onClick={onCancel}>
                Cancel
            </button>
            <button type="submit" className="bug-report-primary" disabled={isSaving}>
                {isSaving ? (
                    'Saving...'
                ) : isEditMode ? (
                    'Save Changes'
                ) : (
                    <>
                        <span className="bug-report-primary__plus" aria-hidden="true">+</span>
                        <span>Post Bug</span>
                    </>
                )}
            </button>
        </footer>
    );
}

export default BugReportActions;
