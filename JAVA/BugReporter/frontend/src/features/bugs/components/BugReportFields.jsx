import './BugReportFields.css';
import {getPastedImageDataUrl} from '@shared/utils/clipboardImages.js';
import {isValidImageSource} from '@shared/utils/validation.js';

function BugReportFields({form, onFieldChange}) {
    async function handlePicturePaste(event) {
        const imageDataUrl = await getPastedImageDataUrl(event);
        if (imageDataUrl) {
            onFieldChange('picture', imageDataUrl);
        }
    }

    return (
        <>
            <label className="bug-report-field">
                <span>Bug title</span>
                <input
                    value={form.title}
                    onChange={(event) => onFieldChange('title', event.target.value)}
                    placeholder="e.g. Critical: Auth token expiration on checkout"
                />
            </label>

            <label className="bug-report-field bug-report-field--textarea">
                <span>Description</span>
                <textarea
                    value={form.text}
                    onChange={(event) => onFieldChange('text', event.target.value)}
                    placeholder="Steps to reproduce, expected vs actual behavior..."
                />
            </label>

            <label className="bug-report-field bug-report-field--url">
                <span>Screenshot / attachment</span>
                <input
                    value={form.picture}
                    onChange={(event) => onFieldChange('picture', event.target.value)}
                    onPaste={handlePicturePaste}
                    placeholder="Paste screenshot here or add an image URL..."
                />
                {isValidImageSource(form.picture) && (
                    <div className="bug-report-image-preview">
                        <img src={form.picture} alt="Bug attachment preview"/>
                        <button type="button" onClick={() => onFieldChange('picture', '')}>
                            Remove image
                        </button>
                    </div>
                )}
            </label>
        </>
    );
}

export default BugReportFields;
