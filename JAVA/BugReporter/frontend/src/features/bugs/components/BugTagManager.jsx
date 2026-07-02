import './BugTagManager.css';
import DropdownMenu from '@shared/components/dropdown/DropdownMenu.jsx';

function BugTagManager({tags, selection, handlers}) {
    const {selectedTags, selectedExistingTag, selectedExistingTagId, isTagMenuOpen, newTagName} = selection;
    const {
        onMenuToggle,
        onExistingTagSelect,
        onExistingTagAdd,
        onNewTagNameChange,
        onNewTagCreate,
        onSelectedTagRemove
    } = handlers;

    return (
        <div className="bug-report-tags">
            <div className="bug-report-tags__header">
                <span>Tag management</span>
                <div>
                    {selectedTags.map((tag) => (
                        <button key={tag.id} type="button" onClick={() => onSelectedTagRemove(tag.id)}>
                            {tag.name} x
                        </button>
                    ))}
                </div>
            </div>

            <div className="bug-report-tags__controls">
                <DropdownMenu
                    className="bug-report-tag-picker"
                    triggerLabel={selectedExistingTag?.name ?? 'Select tag...'}
                    isOpen={isTagMenuOpen}
                    onOpenChange={(open) => {
                        if (open !== isTagMenuOpen) {
                            onMenuToggle();
                        }
                    }}
                    menuId="bug-report-tag-menu"
                    align="left"
                    variant="block"
                >
                    <div className="bug-report-tag-picker__list">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                role="menuitem"
                                className={`dropdown-menu__item ${String(selectedExistingTagId) === String(tag.id) ? 'is-selected' : ''}`}
                                onClick={() => onExistingTagSelect(tag.id)}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>

                    <div className="bug-report-tag-picker__create">
                        <span>Create tag</span>
                        <div>
                            <input
                                value={newTagName}
                                onChange={(event) => onNewTagNameChange(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        onNewTagCreate();
                                    }
                                }}
                                placeholder="New tag name..."
                            />
                            <button type="button" onClick={onNewTagCreate} disabled={!newTagName.trim()}>
                                Create
                            </button>
                        </div>
                    </div>
                </DropdownMenu>
                <button
                    type="button"
                    onClick={onExistingTagAdd}
                    disabled={!selectedExistingTagId}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default BugTagManager;
