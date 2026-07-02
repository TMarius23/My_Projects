import './BugFeedPagination.css';

function BugFeedPagination({pageInfo, onPageChange}) {
    if (pageInfo.totalPages <= 1) {
        return null;
    }

    return (<div className="bug-feed-pagination">
        <button
            type="button"
            disabled={pageInfo.first}
            onClick={() => onPageChange((currentPage) => Math.max(currentPage - 1, 0))}
        >
            Previous
        </button>

        <span>
        Page {pageInfo.number + 1} of {pageInfo.totalPages}
      </span>

        <button
            type="button"
            disabled={pageInfo.last}
            onClick={() => onPageChange((currentPage) => currentPage + 1)}
        >
            Next
        </button>
    </div>);
}

export default BugFeedPagination;
