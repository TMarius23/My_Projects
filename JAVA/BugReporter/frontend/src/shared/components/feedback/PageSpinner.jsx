import './PageSpinner.css';

function PageSpinner() {
    return (
        <div className="page-spinner" role="status" aria-label="Loading">
            <div className="page-spinner__ring"/>
        </div>
    );
}

export default PageSpinner;
