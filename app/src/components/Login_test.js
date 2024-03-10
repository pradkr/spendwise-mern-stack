import { useState, useEffect  } from "react";
import Input from './form/Input'
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [userInput, setInput] = useState({ email: "", password: "", });
  const [error, setError]     = useState(null);
  //const [token, setUserToken] = useState();

  //const [hasError, setHasError] = useState(false);

  // useErrorBoundary((error, errorInfo) => {
  //   // You can also log the error to an error reporting service
  //   //logErrorToMyService(error, errorInfo);
  //   setHasError(true);
  // });

  const auth = useAuth();

  useEffect(() => {
    setError(auth.userError);
    setUserToken(auth.userToken);
  }, [auth.userError, auth.userToken]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (userInput.email !== "" && userInput.password !== "") {
      auth.loginAction(userInput) ;
      //('success='+token+'error='+eralertror+'');
      console.log(auth.userToken, auth.userError, auth.loginAction, auth.logOut) 
      return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value, }));
  };
  
  // if (hasError) {
  //   // You can render any custom fallback UI
  //   return <h1>Something went wrong.</h1>;
  // }
  
  return (
<div>
    <h1>Login</h1>
    {/* {(auth.errorAuth) && (<h4 className="error">Some error Occurred. Try again.</h4>)} */}
    {(error) && (<h4 className="error">Some error Occurred. Try again.</h4>)}
    
    <form onSubmit={handleSubmitEvent} className="form">
        <Input type="email"    id="useremail" name="email" onChange={handleInput} placeholder="example@yahoo.com" aria-describedby="user-email" aria-invalid="false"  />
        <Input type="password" id="password" name="password" onChange={handleInput} aria-describedby="user-password" aria-invalid="false" />
        <input type="submit" value="Login" />
    </form>
     {/* (auth.errorAuth) ? <h1>{auth.errorAuth}</h1>  : null */}
     {/* {auth.errorAuth ? (auth.errorAuth) : null} */}

</div>
  );
}

export default Login;