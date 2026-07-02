import './BugFeedSidebar.css';

function BugFeedSidebar({meta, selectedTagId, onTagSelect}) {
    return (
        <aside className="bug-feed-sidebar">
            <section className="bug-panel">
                <h2>Trending Tags</h2>
                <ul className="tag-list">
                    {meta.tagCounts.map((tag) => (
                        <li key={tag.id}>
                            <button
                                type="button"
                                className={String(selectedTagId) === String(tag.id) ? 'is-selected' : ''}
                                onClick={() => onTagSelect(tag.id)}
                            >
                                {tag.name}
                            </button>
                            <strong>{tag.count}</strong>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bug-panel">
                <h2>Top Bug Hunters</h2>
                <div className="hunter-list">
                    {meta.topHunters.map((hunter) => (
                        <p key={hunter.id}>
                            <span>{(hunter.username ?? '?').slice(0, 2).toUpperCase()}</span>
                            <b>{hunter.username}</b>
                            <small>{hunter.score} pts • {hunter.solved} Solved</small>
                        </p>
                    ))}
                </div>
            </section>
        </aside>
    );
}

export default BugFeedSidebar;
