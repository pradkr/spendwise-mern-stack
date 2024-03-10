import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import useAuthentication from "./context/useAuthentication";

function ConnectedApp() {
  const { AuthProvider } = useAuthentication();
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </React.StrictMode>
);

