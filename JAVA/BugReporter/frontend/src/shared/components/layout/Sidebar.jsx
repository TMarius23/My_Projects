import {NavLink} from 'react-router-dom';
import {useAuth} from '@features/auth/hooks/useAuth.js';
import BugIcon from '@assets/icons/bug.svg?react';
import UsersIcon from '@assets/icons/users.svg?react';
import './Sidebar.css';

function Sidebar() {
    const {user, logout} = useAuth();
    const displayName = user?.username || 'User';

    return (<aside className="sidebar">
        <NavLink to="/bugs" className="sidebar__brand">
        <span className="sidebar__brand-icon" aria-hidden="true">
          <BugIcon width="20" height="20"/>
        </span>
            <strong>Bug Reporter</strong>
        </NavLink>

        <nav className="sidebar__nav" aria-label="Main navigation">
            <NavLink to="/bugs" end className="sidebar__link">
          <span className="sidebar__link-icon sidebar__link-icon--feed" aria-hidden="true">
            <span/>
            <span/>
            <span/>
          </span>
                Bug Feed
            </NavLink>
            <NavLink to="/profile" className="sidebar__link">
                <span className="sidebar__link-icon sidebar__link-icon--mine" aria-hidden="true"/>
                My Profile
            </NavLink>
            <NavLink to="/bugs/new" className="sidebar__link">
                <span className="sidebar__link-icon sidebar__link-icon--report" aria-hidden="true"/>
                Report Bug
            </NavLink>
            {user?.role === 'MODERATOR' && (<NavLink to="/moderation/users" className="sidebar__link">
            <span className="sidebar__link-icon" aria-hidden="true">
              <UsersIcon width="16" height="16"/>
            </span>
                User Management
            </NavLink>)}
        </nav>

        <div className="sidebar__user">
            <div className="sidebar__avatar">
                {displayName.slice(0, 1).toUpperCase()}
            </div>
            <div className="sidebar__user-info">
                <strong>{displayName}</strong>
            </div>
            <button type="button" className="sidebar__logout" onClick={logout}>
                Log out
            </button>
        </div>
    </aside>);
}

export default Sidebar;
