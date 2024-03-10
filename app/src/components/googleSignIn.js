import React, {useEffect, useState} from 'react';
import { jwtDecode } from "jwt-decode";


export const GoogleSignIn = ({token, name, setToken, logOut}) => {
  const [user, setUser] = useState({});  //remove state and use redux or global state
  

  const handleCallbackResponse = (response) => {
    const userInfo = jwtDecode(response.credential);
    setUser(userInfo);
    document.getElementById('sign-in-div').hidden = true; //if user info returned, s/he is logged in, hide the google signin button
  }

  const handleSignOut = (e) => {
    setToken(null); //empty logged in user who used other auth than google
    setUser({}); //empty the user details
    const googleSignInButton = document.getElementById('sign-in-div');
    if(googleSignInButton) {
      googleSignInButton.hidden = false
    }
    //document.getElementById('sign-in-div').hidden = false;  //show sign in button now
    logOut();
  }

  const handleSignIn = (e) => {
    //It should be similar to google handleCallbackResponse
    // const userInfo = jwtDecode(response.credential);
    // setUser(userInfo);
    // document.getElementById('sign-in-div').hidden = true; //if user info returned, s/he is logged in, hide the google signin button
  }
    
    useEffect(() => {
      const google = window.google;
      if (google && typeof google.accounts !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: "610648660195-2i11qvl03lc4v5jk7o171o85jk7g7ptn.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        //https://developers.google.com/identity/gsi/web/reference/js-reference
        google.accounts.id.renderButton(
          document.getElementById('sign-in-div'), {theme:'outline', size: 'small', shape: 'pill'
        });
        //google.accounts.id.prompt();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return ( 
    <div>
         {
            (user && user.given_name && user.picture && ( Object.keys(user).length !== 0) && (user.email)) 
            && (
              <>
              <span className='username'>Hello {user.given_name}</span>
              <span><img src={user.picture} alt={user.given_name} className='logged-in-user-img' /></span>
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
              </>
            )
            ||
            (<div id='sign-in-div'></div>)
        }
    </div>
  )
}
