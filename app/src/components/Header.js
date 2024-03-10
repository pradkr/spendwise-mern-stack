import React from 'react';
//import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom'

export const Header = ({token, name, setToken, logOut}) => {
  //const [user, setUser] = useState({});  //remove state and use redux or global state
  
  // const handleSignOut = (e) => {
  //   setToken(null); //empty logged in user who used other auth than google
  //   //setUser({}); //empty the user details
  //   logOut();
  // }
     
  return ( 
    <nav>
        <div className="logo">SpendWise</div>
        <div className="nav-buttons">   
            <div className='logged-in'>
              <div>
                <Link to="/">Home</Link>
              </div>
      {(token && name) ?
            <>
              <div className='logged-in-user-section'>
                <div className='truncate'>Hello &nbsp;{name}</div>
              </div>
              <div>
                <button onClick={() => logOut()}>Logout</button>
              </div> 
            </>
        : (  
            <>
              {/* <button onClick={(e) => handleSignIn(e)} >Sign in </button>  */}
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/signup">Sign Up</Link>
              </div>
            </>
          )
        }
            </div>

              
        </div>
    </nav>
  )
}
