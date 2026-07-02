import {useAuth} from '@features/auth/hooks/useAuth.js';
import LoadingSkeleton from '@shared/components/feedback/LoadingSkeleton.jsx';
import StateMessage from '@shared/components/feedback/StateMessage.jsx';
import {messages} from '@shared/utils/messages.js';
import roleConfig from '../userRoleConfig.json';
import {useModeratorUsers} from '../hooks/useModeratorUsers.js';
import './ModeratorUsersPage.css';

const DEFAULT_ROLE = 'USER';

function ModeratorUsersPage() {
    const {user} = useAuth();
    const isModerator = user?.role === 'MODERATOR';
    const moderatorUsers = useModeratorUsers(isModerator);

    if (!isModerator) {
        return (
            <StateMessage className="moderator-users-state" tone="error">
                {messages.moderatorOnly}
            </StateMessage>
        );
    }

    return (
        <section className="moderator-users-page">
            <header className="moderator-users-header">
                <div>
                    <p>User Management</p>
                    <h1>User Management</h1>
                </div>
                <label className="moderator-users-search">
                    <span aria-hidden="true"/>
                    <input
                        type="search"
                        value={moderatorUsers.searchTerm}
                        onChange={(event) => moderatorUsers.updateSearchTerm(event.target.value)}
                        placeholder="Search users..."
                        aria-label="Search users"
                    />
                </label>
            </header>

            {moderatorUsers.isLoading && <LoadingSkeleton count={4} variant="table"/>}
            {moderatorUsers.errorMessage && (
                <StateMessage className="moderator-users-state" tone="error">
                    {moderatorUsers.errorMessage}
                </StateMessage>
            )}
            {moderatorUsers.banErrorMessage && (
                <StateMessage className="moderator-users-state" tone="error">
                    {moderatorUsers.banErrorMessage}
                </StateMessage>
            )}

            <div className="moderator-users-table" role="region" aria-label="Users table">
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {moderatorUsers.users.map((item) => {
                        const isCurrentUser = String(item.id) === String(user.id);
                        const role = roleConfig[item.role] ?? roleConfig[DEFAULT_ROLE];
                        return (
                            <tr key={item.id}>
                                <td>
                                    <strong>{item.username}</strong>
                                </td>
                                <td>{item.email}</td>
                                <td>
                    <span className={`moderator-user-role moderator-user-role--${role.modifier}`}>
                      {role.label}
                    </span>
                                </td>
                                <td>
                    <span
                        className={item.banned ? 'moderator-user-status is-banned' : 'moderator-user-status is-active'}>
                      {item.banned ? 'Banned' : 'Active'}
                    </span>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        disabled={isCurrentUser || moderatorUsers.isSaving}
                                        onClick={() => moderatorUsers.toggleBan({id: item.id, banned: item.banned})}
                                    >
                                        {item.banned ? 'Unban' : 'Ban'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {!moderatorUsers.isLoading && moderatorUsers.users.length === 0 && (
                    <StateMessage className="moderator-users-empty">{messages.noUsers}</StateMessage>
                )}
            </div>

            {moderatorUsers.pageData.totalPages > 1 && (
                <div className="moderator-users-pagination">
                    <button
                        type="button"
                        disabled={moderatorUsers.pageData.first}
                        onClick={() => moderatorUsers.setPage((currentPage) => Math.max(currentPage - 1, 0))}
                    >
                        Previous
                    </button>
                    <span>
            Page {moderatorUsers.pageData.number + 1} of {moderatorUsers.pageData.totalPages}
          </span>
                    <button
                        type="button"
                        disabled={moderatorUsers.pageData.last}
                        onClick={() => moderatorUsers.setPage((currentPage) => currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}

export default ModeratorUsersPage;
