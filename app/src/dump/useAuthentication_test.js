import React, { useState, createContext } from "react";
import axios from 'axios';

const AuthCtx = createContext();


// async function loginUser1(email, password) {
//   const config = { headers: {'Content-Type': 'application/json'}};
//   const body = JSON.stringify({ email, password });
//        const res = await axios.post('/api/login', { email, password });
//              return res.data
//   const response = await axios.post('http://localhost:5000/api/login', body, config)
//   return response.data
// }

const useAuthentication = (history, location) => {
  const [ctxtUser, setCtxtUser] = useState(null);
  const [ctxError, setCtxtError] = useState(null);

  const logIn = async (event, email, password) => {
    event.preventDefault()
    console.log("Debug: useAuth ctx - logIn email, password" + email +' '+ password);
    //alert("Debug: useAuth ctx - logIn" + email +' '+ password);
    // const res = await axios.post('/api/v1/user/login', { email, password })
    await axios.post('/api/v1/user/login', { email, password })
    .then(resp => {
      //response.json({ message: 'Request received!', resp.data })
      console.log('API success response='+ resp.data )
      localStorage.setItem('token', resp.data) //not secure
      setCtxtUser(resp.data);
      setCtxtError(null);
    }).catch(err => {
      setCtxtError(err);
      console.log('Invalid login credentials')
      console.log(err);
    });
  };

  const logOut = async () => {
    setCtxtUser(null);
    setCtxtError(null);
  }

  return {
    AuthCtx,
    AuthProvider: ({ children }) => (
      <AuthCtx.Provider value={{ ctxError, ctxtUser, logIn, logOut }}>
        {children}
      </AuthCtx.Provider>
    )
  };
};

export default useAuthentication;
