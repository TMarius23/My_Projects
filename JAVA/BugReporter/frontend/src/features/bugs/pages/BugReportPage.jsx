import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import LoadingSkeleton from '@shared/components/feedback/LoadingSkeleton.jsx';
import StateMessage from '@shared/components/feedback/StateMessage.jsx';
import {messages} from '@shared/utils/messages.js';
import BugReportActions from '../components/BugReportActions.jsx';
import BugReportFields from '../components/BugReportFields.jsx';
import BugTagManager from '../components/BugTagManager.jsx';
import {useBugReportForm} from '../hooks/useBugReportForm.js';
import './BugReportPage.css';

function BugReportPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useAuth();
    const isEditMode = Boolean(id);
    const bugForm = useBugReportForm({
        bugId: id,
        isEditMode,
        user,
        onSaved: () => navigate('/bugs'),
    });

    if (bugForm.isLoading) {
        return (
            <section className="bug-report-page">
                <LoadingSkeleton count={2}/>
            </section>
        );
    }

    if (isEditMode && !bugForm.canEdit) {
        return (
            <StateMessage className="bug-report-state" tone="error">
                {messages.onlyAuthorOrModeratorCanEditBug}
            </StateMessage>
        );
    }

    return (
        <section className="bug-report-page">
            <header className="bug-report-header">
                <p>{messages.bugReportTitle}</p>
                <h1>{isEditMode ? messages.bugReportEditHeading : messages.bugReportNewHeading}</h1>
                <span>{messages.bugReportSubtitle}</span>
            </header>

            <form className="bug-report-form" onSubmit={bugForm.submit}>
                <BugReportFields form={bugForm.form} onFieldChange={bugForm.updateField}/>

                <BugTagManager
                    tags={bugForm.tags}
                    selection={{
                        selectedTags: bugForm.selectedTags,
                        selectedExistingTag: bugForm.selectedExistingTag,
                        selectedExistingTagId: bugForm.selectedExistingTagId,
                        isTagMenuOpen: bugForm.isTagMenuOpen,
                        newTagName: bugForm.newTagName,
                    }}
                    handlers={{
                        onMenuToggle: bugForm.toggleTagMenu,
                        onExistingTagSelect: bugForm.selectExistingTag,
                        onExistingTagAdd: bugForm.addExistingTag,
                        onNewTagNameChange: bugForm.setNewTagName,
                        onNewTagCreate: bugForm.addNewTag,
                        onSelectedTagRemove: bugForm.removeSelectedTag,
                    }}
                />

                {bugForm.errorMessage && (
                    <StateMessage className="bug-report-message" tone="error">
                        {bugForm.errorMessage}
                    </StateMessage>
                )}

                <BugReportActions
                    isEditMode={isEditMode}
                    isSaving={bugForm.isSaving}
                    onCancel={() => navigate('/bugs')}
                />
            </form>
        </section>
    );
}

export default BugReportPage;
