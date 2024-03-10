import React, {useState} from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
    .then( data => data.json())
    .catch(err => console.log(err) )
} 

export default function Login({ setToken }) {
    const [email, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({ email, password });
      setToken(token);
    }
  
    return(
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p><input name="email" type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p><input name="password" type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}