import { useState } from "react";
import Input from './../components/form/Input'
import AuthProvider from "../context/AuthProvider";

export default Login = () => {
  const [userData, setInput] = useState({email: "", password: "", });

  const loginUser = (e) => {
    e.preventDefault();
    if (userData.email !== "" && userData.password !== "") {
      //dispatch action from hooks
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value, }));
  };

  return (
    <form onSubmit={loginUser}>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        
        <Input type="email" id="user-email" name="email"
          placeholder="example@yahoo.com" aria-describedby="user-email"
          aria-invalid="false" onChange={(e) => handleInput} />
        {/* <input type="email" id="user-email" name="email"
          placeholder="example@yahoo.com" aria-describedby="user-email"
          aria-invalid="false" onChange={handleInput} /> */}
        <div id="user-email" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <Input type="password" id="password" name="password" aria-describedby="user-password"
          aria-invalid="false" onChange={(e) => handleInput} />
        {/* <input type="password" id="password" name="password" aria-describedby="user-password"
          aria-invalid="false" onChange={handleInput} /> */}
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

//export default Login;