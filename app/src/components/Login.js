import React, { useState } from "react";
import PropTypes from 'prop-types';
//import useAuthentication from "../context/useAuthentication";
//import { useNavigate, useLocation } from "react-router-dom";

import {loginUser 
  //, loginUser1
} from './App/useLogin';

//const HOST = process.env.HOST_BE || 'http://localhost:5000'

// async function loginUser(credentials) {
//   return await fetch(`${HOST}/api/v1/user/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials)
//   })
//   .then( data => data.json())
//   .catch(err => console.log('Error in login'+err) )
// } 

export default function  Login({ setToken }) {

  const [email, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ email, password });
    //await loginUser1().then(response => console.log('from loginUser1'+response));
    setToken(token);
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  //const history = useHistory();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { AuthCtx } = useAuthentication();
  // const { user, error, logIn,    // logOut,
  // } = useContext(AuthCtx);
  // const { from } = (location && location.state) || { from: { pathname: "/" } };
  
  // useEffect(() => {
  //   user && navigate(from, { replace: true }); //history.replace(from);
  // }, [user, from, navigate]);

  return (
  <div>
    <h1>Login Section</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email"> Email</label>
        <input name="email" type="email" onChange={e => setUserName(e.target.value)}  placeholder="E-Mail" required/>
      </div>
      <div className="form-control">
        <label htmlFor="password"> Password</label>
        <input name="password" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
      </div>
      <div><button type="submit">Submit</button></div>
    </form>
    {/* {error ? ({error}) : null} */}
  </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

