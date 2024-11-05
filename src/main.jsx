import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './contexts/Context.jsx';

createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
);
