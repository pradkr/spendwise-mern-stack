import React, { useState } from "react";
//import useAuthentication from "../context/useAuthentication";
//import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

// const { Title } = Typography;
async function loginUser(credentials) {
  return await fetch('/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
  })
  .then( data => data.json())
  .catch(err => console.log(err) )
} 

export default function  Login({ setToken }) {

  const [email, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ email, password });
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
        {/* <form onSubmit={handleSubmit}>
          
          <input onChange={e => setEmail(e.target.value)}    value={email}    type="email" placeholder="E-Mail"/>
          <input onChange={e => setPassword(e.target.value)} value={password} type="password"  placeholder="Password"/>
          <button type="primary"  onClick={(event) => { logIn(event, email, password) }} >Login</button>
          </form> */}

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

