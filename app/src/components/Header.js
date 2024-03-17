import React from 'react';
import { Link } from 'react-router-dom'
import { useLogOut } from '../context/useLogOut';
import { useAuthContext } from '../context/useAuthContext';

//export const Header = ({token, name, setToken, logOut}) => {
export const Header = () => {
  const { user } = useAuthContext();
  //const [user, setUser] = useState({});  //remove state and use redux or global state
  const {logout} = useLogOut();
  const handleSignOut = (e) => {
    //setToken(null); //empty logged in user who used other auth than google
    //setUser({}); //empty the user details
    //logOut();
    logout();
  }
     
  return ( 
    <nav>
        <div className="logo">SpendWise</div>
        <div className="nav-buttons">   
            <div className='logged-in'>
              <div>
                <Link to="/">Home</Link>
              </div>
    { 
      //(token && name) ?
      (user && (user.name || user.email)) ? (
            <>
              <div className='logged-in-user-section'>
                <div className='truncate'>Hello &nbsp;{user.name || user.email}</div>
              </div>
              <div>
                <button onClick={handleSignOut}>Logout</button>
              </div> 
            </>
      )
      : 
      (  
            <>
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
