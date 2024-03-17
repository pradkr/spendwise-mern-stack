// import { jwtDecode} from 'jwt-decode'
import React from 'react';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom'
import { GlobalProvider } from './context/GlobalState';
import { Header } from './components/Header';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { IncomeExpenses } from './components/IncomeExpenses';
import { Footer } from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp'
// import useToken from './components/App/useToken';
import './App.css';
import './holygrail.css';
import { useAuthContext } from './context/useAuthContext';

function App() {
//   const { token, setToken, deleteToken } = useToken();
  // const [ loginError, setLoginError ] = useState();
  const { user } = useAuthContext();
  //console.log('In App.js, user='+user)
  
  return (

  <div className='holy-grail-flexbox'>
    <GlobalProvider>
      <BrowserRouter>
        <header className='header'>
          <Header />
        </header> 
        <main className='main-content'>
            {(user?.error) && (<div className='user-error-box'>{user.error}</div>)} 
            
            <Routes>
                <Route path="/"       exact element={ user ? <IncomeExpenses />  : <Navigate to="/login"/> } />
                <Route path="/login"  exact element={!user ? <Login />  : <Navigate to="/"/> } />
                <Route path="/signup" exact element={!user ? <SignUp /> : <Navigate to="/"/> } />
                {/* <Login   setToken={setToken} setLoginError={setLoginError} /> */}
            </Routes>
        </main>

        <section className='left-sidebar'>
        { (user?.email) ? ( 
            <TransactionList email={user.email} />
            ) : null }
        </section>
 
        <aside className='right-sidebar'>
        { (user?.email) ? (  
            <AddTransaction email={user.email}/>
            ) : null }
        </aside>

        <footer className='footer'>
            <Footer />
        </footer>    
      </BrowserRouter>
    </GlobalProvider>
  </div>

  );
}

export default App;