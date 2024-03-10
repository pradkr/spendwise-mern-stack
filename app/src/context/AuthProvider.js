import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userError, setUserError] = useState(null);
  // useEffect(() => {
  //   setUserToken();
  //   setUserError();
  // }, [ userToken, userError]);
  //const [errorAuth, setErrorAuth]   = useState(null);
  //const [user, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      //await axios.post('/api/v1/user/login', { email, password })
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data),
      });
      
      const res = await response.json(); //resp.json() is asynchrous hence await is needed. https://stackoverflow.com/questions/59555534/why-is-json-asynchronous
      //console.log('In loginAction: resp=' + JSON.stringify(res))
      
      if (res.user) {
        //console.log('Success - in Auth, res.user=' + JSON.stringify(res.user))
        setUserToken(res.user);
        setUserError(null);
        //console.log('Success - in Auth, state var=' + (userToken))
        localStorage.setItem("sitetoken", res.user);
        //alert('success login. state='+userToken)
        navigate("/dashboard");
        return;
      }
      
      setUserError('Unauthorized.')
      //console.log('Error state value is =' + userError )
      throw new Error('Unauthorized. ' + JSON.stringify(res.status) ); //user didnt provide correct password
    } catch (err) {
      setUserError(err);
      //console.error('Error: ' + err );
      //alert('Error state value is =' + userError )
      //console.log('Error state value is =' + userError )
    }
  };

  const logOut = () => {
    setUserToken(null);
    //setToken("");
    localStorage.removeItem("sitetoken");
    navigate("/login");
  };


//   const [transactions, setPosts] = useState([]);
//   const [email, setEmail]   = useState('')
//   const [email1, setEmail1] = useState('')
//   const [password, setPassword] = useState('')

//   useEffect(() => {
//    // axios.get('/api/v1/transactions')
//   }, []);

// async function findUser(event) {
//     event.preventDefault()
//     axios.post('/api/v1/user/find', { email1 } )
//     .then(res => {
//       //const output=res.data.data 
//       console.log('axios resp'+ JSON.stringify(res));
//       const userdata=res.data
//       setEmail1(userdata);
//       localStorage.setItem('token', userdata)
//       console.log(JSON.stringify(userdata));
//     })
//     .catch(error => {
//       console.log('Invalid login credentials')
//       console.log(error);
//       console.error(error);
//     })
// } 
//
// async function loginUser(event) {
//     event.preventDefault()
//
//     axios.post('/api/v1/user/login', { email, password } )
//       .then(res => {
//         //const output=res.data.data 
//         const userdata=res.data
//         setEmail(userdata);
//         localStorage.setItem('token', userdata)
//         console.log(JSON.stringify(userdata));
//       })
//       .catch(error => {
//         console.log('Invalid login credentials')
//         console.log(error);
//         console.error(error);
//       })
// }


  return (
    <AuthContext.Provider value={{ userToken, userError, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};