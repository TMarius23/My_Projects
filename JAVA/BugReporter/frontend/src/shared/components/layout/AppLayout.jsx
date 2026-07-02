import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import './AppLayout.css';

function AppLayout({children}) {
    return (
        <div className="app-layout">
            <Sidebar/>

            <main className="app-layout__content">
                {children ?? <Outlet/>}
            </main>
        </div>
    );
}

export default AppLayout;
