import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return { user: action.payload } 
    case 'LOGOUT':
      return { user: null } 
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {user: null})  //initially user will be null

    // const isTokenExpired = (insertedAtDate) =>{
    //     const current_time_secs = Date.now() / 1000;  //Date.now gives milliseconds 
    //     const secondsInOneWeek = 604800;
    //     //const secondsInOneHour = 3600;
    //     if( insertedAtDate < current_time_secs - secondsInOneWeek ) {
    //       console.log('Token expired.');
    //       // localStorage.removeItem("token");
    //       return true;
    //     }
    //     return false;
    // }

    useEffect( () => {
    const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])
  
    //console.log('AuthContext state: ', state); //state has user={email:"jim@gmail.com", name:"Jim", status:"ok", success:true, user:"eyJhb.dsfs.sdfsd"}
  
  return (
    <AuthContext.Provider value={{...state , dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}