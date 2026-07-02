import './PageFooter.css';

function PageFooter({registerPrompt, registerLinkLabel, registerHref}) {
    return (
        <div className="page-footer">
            <p className="page-footer__register">
                {registerPrompt}{' '}
                <a className="page-footer__register-link" href={registerHref}>
                    {registerLinkLabel}
                </a>
            </p>
        </div>
    );
}

export default PageFooter;
