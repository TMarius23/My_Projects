import './BugFeedControls.css';
import SearchInput from '@shared/components/inputs/SearchInput.jsx';
import DropdownMenu from '@shared/components/dropdown/DropdownMenu.jsx';
import {messages} from '@shared/utils/messages.js';

function BugFeedControls({filters, controlState, lockMineOnly}) {
    return (
        <div className="bug-feed-controls">
            <SearchInput
                className="bug-feed-search"
                value={filters.searchTerm}
                onChange={filters.updateSearchTerm}
                placeholder="Search bug titles..."
                ariaLabel="Search bugs"
            />

            <label className="bug-feed-toggle">
                <span>My Bugs</span>
                <input
                    type="checkbox"
                    checked={filters.mineOnly}
                    disabled={lockMineOnly}
                    onChange={(event) => filters.updateMineOnly(event.target.checked)}
                />
                <span className="bug-feed-toggle__switch" aria-hidden="true"/>
            </label>

            <DropdownMenu
                className="bug-user-menu"
                label="User"
                triggerLabel={controlState.selectedUserLabel}
                isOpen={filters.isUserOpen}
                onOpenChange={filters.setIsUserOpen}
                onBeforeOpen={() => filters.setUserSearchTerm('')}
                disabled={filters.mineOnly}
                menuId="bug-user-menu"
                align="left"
            >
                <SearchInput
                    className="bug-filter-menu__search"
                    value={filters.userSearchTerm}
                    onChange={filters.setUserSearchTerm}
                    placeholder="Search users..."
                    ariaLabel="Search users"
                />
                <button
                    type="button"
                    role="menuitem"
                    className={`dropdown-menu__item ${filters.selectedUserId === 'all' ? 'is-selected' : ''}`}
                    onClick={() => filters.selectUser('all')}
                >
                    All Users
                </button>
                {controlState.visibleUsers.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        role="menuitem"
                        className={`dropdown-menu__item ${String(filters.selectedUserId) === String(item.id) ? 'is-selected' : ''}`}
                        onClick={() => filters.selectUser(item.id)}
                    >
                        {item.username}
                    </button>
                ))}
                {controlState.visibleUsers.length === 0 && (
                    <p className="dropdown-menu__empty">{messages.noUsers}</p>
                )}
            </DropdownMenu>

            <DropdownMenu
                className="bug-tag-menu"
                label="Tag"
                triggerLabel={controlState.selectedTagLabel}
                isOpen={filters.isTagOpen}
                onOpenChange={filters.setIsTagOpen}
                onBeforeOpen={() => filters.setTagSearchTerm('')}
                menuId="bug-tag-menu"
                align="left"
            >
                <SearchInput
                    className="bug-filter-menu__search"
                    value={filters.tagSearchTerm}
                    onChange={filters.setTagSearchTerm}
                    placeholder="Search tags..."
                    ariaLabel="Search tags"
                />
                <button
                    type="button"
                    role="menuitem"
                    className={`dropdown-menu__item ${filters.selectedTagId === 'all' ? 'is-selected' : ''}`}
                    onClick={() => filters.selectTag('all')}
                >
                    All Tags
                </button>
                {controlState.visibleTags.map((tag) => (
                    <button
                        key={tag.id}
                        type="button"
                        role="menuitem"
                        className={`dropdown-menu__item ${String(filters.selectedTagId) === String(tag.id) ? 'is-selected' : ''}`}
                        onClick={() => filters.selectTag(tag.id)}
                    >
                        {tag.name}
                    </button>
                ))}
                {controlState.visibleTags.length === 0 && (
                    <p className="dropdown-menu__empty">{messages.noTags}</p>
                )}
            </DropdownMenu>
        </div>
    );
}

export default BugFeedControls;
