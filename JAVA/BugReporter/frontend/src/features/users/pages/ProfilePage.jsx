import {useAuth} from '@features/auth/hooks/useAuth.js';
import BugListPage from '@features/bugs/pages/BugListPage.jsx';
import {messages} from '@shared/utils/messages.js';
import {adaptUserForUi} from '../utils/userAdapters.js';
import roleConfig from '../userRoleConfig.json';
import './ProfilePage.css';

const DEFAULT_ROLE = 'USER';

function ProfilePage() {
    const {user: rawUser} = useAuth();
    const user = adaptUserForUi(rawUser ?? {});
    const roleInfo = roleConfig[user.role] ?? roleConfig[DEFAULT_ROLE];

    return (
        <div className="profile-page">
            <section className="profile-card" aria-label="User profile">
                <div className="profile-avatar" aria-hidden="true">
                    {user.username?.slice(0, 1).toUpperCase() ?? '?'}
                </div>
                <div className="profile-info">
                    <h1 className="profile-username">{user.username}</h1>
                    <p className="profile-email">{user.email}</p>
                    <div className="profile-meta">
            <span className={`profile-role profile-role--${roleInfo.modifier}`}>
              {roleInfo.label}
            </span>
                        <span className="profile-score">Score: {user.score}</span>
                    </div>
                </div>
            </section>

            <section aria-label="My bug reports">
                <BugListPage
                    title="My Reports"
                    initialMineOnly
                    lockMineOnly
                    showControls={false}
                    showSidebar={false}
                    emptyMessage={messages.noMyBugs}
                />
            </section>
        </div>
    );
}

export default ProfilePage;
