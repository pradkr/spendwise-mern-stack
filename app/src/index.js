import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';
// import { Provider } from 'react-redux';
// import store from './store';

//import AuthProvider from './context/AuthProvider'
// function ConnectedApp() {
//   //const { AuthProvider } = useAuthentication();
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <AuthContextProvider>
    {/* <Provider store={store}> */}
      {/* <ConnectedApp /> */}
      <App />
    {/* </Provider> */}
    </AuthContextProvider>
  </React.StrictMode>
);

