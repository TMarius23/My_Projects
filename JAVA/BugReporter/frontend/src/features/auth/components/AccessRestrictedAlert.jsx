import './AccessRestrictedAlert.css';

function AccessRestrictedAlert({title, message}) {
    return (
        <div className="access-alert" role="alert">
            <div className="access-alert__body">
                <p className="access-alert__title">{title}</p>
                <p className="access-alert__message">{message}</p>
            </div>
        </div>
    );
}

export default AccessRestrictedAlert;
