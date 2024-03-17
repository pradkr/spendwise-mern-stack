import React, { useState } from "react";
// import PropTypes from 'prop-types';
import { useLogin } from '../context/useLogin';
//import useAuthentication from "../context/useAuthentication";
// import { loginUser } from './App/useLogin';
//const HOST = process.env.HOST_BE || 'http://localhost:5000'
//export default function Login({ setLoginError }) {

export default function Login() {
  const [email, setUserName]      = useState();
  const [password, setPassword]   = useState();
  const {login, 
    //login1, 
    error, isLoading} = useLogin();

  const handleSubmit = async e => {
    e.preventDefault();
    const apiResponseData = await login({ email, password});
    
    if(apiResponseData) {
      //setToken(apiResponseData);
      //setLoginError(null)
      console.log(JSON.stringify(apiResponseData))
    }
    else {
      //setLoginError('Authentication Failed.')
      //console.log('Failed to login');
    }
  }

  // const { AuthCtx } = useAuthentication();
  // const { user, error, logIn,    
  // logOut,
  // } = useContext(AuthCtx);

  return (
  <div>
    <h1>Login Section</h1>
    {error && <div className='user-error-box'>{error}</div>}
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" onChange={e => setUserName(e.target.value)}  placeholder="E-Mail" required/>
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input name="password" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
      </div>
      <div>
        <button className="btn" disabled={isLoading}>Submit</button>
      </div>
    </form>
  </div>
  );
};

// Login.propTypes = {
//   //setToken: PropTypes.func.isRequired
//   setLoginError: PropTypes.func.isRequired
// }