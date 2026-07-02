import {isRouteErrorResponse, Link, useRouteError} from 'react-router-dom';
import StateMessage from './StateMessage.jsx';
import './AppErrorBoundary.css';

function getErrorMessage(error) {
    if (isRouteErrorResponse(error)) {
        return error.data?.error || error.data?.message || error.statusText;
    }

    return error?.message || 'Something went wrong.';
}

function AppErrorBoundary() {
    const error = useRouteError();

    return (
        <main className="app-error-boundary">
            <StateMessage className="app-error-boundary__message" tone="error">
                <strong>Unexpected application error</strong>
                <span>{getErrorMessage(error)}</span>
                <Link to="/bugs">Back to Bug Feed</Link>
            </StateMessage>
        </main>
    );
}

export default AppErrorBoundary;
