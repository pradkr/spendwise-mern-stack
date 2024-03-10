import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    //console.log('inside useToken->getToken, tokenString=' + tokenString )
    const userToken = JSON.parse(tokenString); // make the read string readable to javascript by pasrse

    return userToken
  };

  const [token, setToken] = useState( getToken() );
  
  const saveToken = userToken => {
    //console.log('userToken=' + JSON.stringify(userToken))
    const userDetail = (userToken?.user) ? userToken.user : null;
    sessionStorage.setItem('token', JSON.stringify(userDetail));
    setToken(userDetail);
    //(token) ? console.log('state token=' + token) : console.log('state token not defined'); //only shows updated values in next render in 
  };

  const removeToken = () => {
    setToken(null);
    sessionStorage.removeItem('token');
  }

  return {
    deleteToken: removeToken,
    setToken: saveToken,
    token
  }
}