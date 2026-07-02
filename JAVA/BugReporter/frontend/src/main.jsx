import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {AppQueryProvider} from '@app/queryClient.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppQueryProvider>
            <App/>
        </AppQueryProvider>
    </StrictMode>,
);
