import React, { useState, createContext } from "react";
import axios from 'axios';
//import { doLogin } from "./api";

const AuthCtx = createContext();

async function loginUser(email, password) {
  //event.preventDefault()
  const config = { headers: {'Content-Type': 'application/json'}};
  const body = JSON.stringify({ email, password });
  let res = null
  try {
     res = await axios.post('/api/login', body, config)
     .then
  } catch (err) {
    console.log('5. In catch block. err=' + err )
    alert('In catch block. err=' + err)
  }
  console.log('6. After axios. res.json=')
  alert('6. After axios. res.json=')
  const data = res.data;
  console.log('7. After axios. data=' + data)
  alert('After axios. data=' + data)

  new Promise((resolve, reject) => {
    if (data.user) {
      localStorage.setItem('token', data.user)
      console.log('8. Login successful. UserDetails='+data.user)
      alert('Login successful. UserDetails='+data.user)
      resolve(data.user);
      
    } else {
      console.log('9. Invalid login credentials' + data)
      alert('Invalid login credentials '+ data)
      reject('Invalid login credentials');
    }
  });
}

async function loginUser1(email, password) {
  const config = { headers: {'Content-Type': 'application/json'}};
  const body = JSON.stringify({ email, password });
       const res = await axios.post('/api/login', body, config);
             return res.data
  const response = await axios.post('http://localhost:5000/api/login', body, config)
  return response.data
}

const useAuthentication = (history, location) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const logIn = (event, email, password) => {
    event.preventDefault()
    //console.log("In logIn in useAuth email, password" + email +' '+ password);
    //alert("In logIn in useAuth email, password" + email +' '+ password);
    loginUser1().then(data => {
      //response.json({ message: 'Request received!', data })
      console.log('New function response='+ data )
    }).catch(err => {
      console.log(err);
    });
      //console.log('New function response='+loginUser1(email, password));
      
      //axios.get('/api/v1/transactions')
      axios.post('/api/login')
      .then(response => {
        setUser(response.data);
        setError(null);
        console.log("10. In loginUser in useAuth then. setting up user="+response.data )
        alert("In loginUser in useAuth then. setting up user="+response.data);
       })
      .catch(error => {
        setError(error);
        console.log("11. In loginUser in useAuth Catch error. setting up user="+user+' and error as='+error )
        alert("In loginUser in useAuth Catch error. setting up user="+user+' and error as='+error )
      });

    // loginUser(email, password)
    //   .then(userDetails => {
    //     setUser(userDetails);
    //     setError(null);
    //     console.log("10. In loginUser in useAuth then. setting up user="+userDetails+' and e0rror as='+error )
    //     alert("In loginUser in useAuth then. setting up user="+userDetails+' and error as='+error );
    //     window.location.href = '/dashboard'
    //   })
    //   .catch(error => {
    //     setError(error);
    //     console.log("11. In loginUser in useAuth Catch error. setting up user="+user+' and error as='+error )
    //     alert("In loginUser in useAuth Catch error. setting up user="+user+' and error as='+error )
    //   });
  };

  const logOut = () => {
    setUser(null);
    setError(null);
  };

  return {
    AuthCtx,
    AuthProvider: ({ children }) => (
      <AuthCtx.Provider value={{ error, user, logIn, logOut }}>
        {children}
      </AuthCtx.Provider>
    )
  };
};

export default useAuthentication;
