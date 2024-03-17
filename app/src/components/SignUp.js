// import PropTypes from 'prop-types';
import React, { useState } from 'react'
// import { loginUser } from './App/useLogin';
import { useSignUp } from '../context/useSignUp';

// const HOST = process.env.HOST_BE || 'http://localhost:5000'
//export default function SignUp  ({ setLoginError }) {
export default function SignUp  () {
	//const navigate = useNavigate();
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {signup, error, isLoading} = useSignUp()

	async function signUpUser(event) {
		event.preventDefault()
		//validateForm(event);
		await signup(name, email, password)
  }

//   function validateForm() {
// 	const inputs = document.querySelectorAll("input, select, textarea");

// 	inputs.forEach(input => {
// 		input.addEventListener("invalid",
// 			event => {
// 				input.classList.add("error");
// 			},
// 			false
// 		);
// 	});
//   }

	return (
<div>
	<h1>Sign Up</h1>
	{error && <div className='user-error-box'>{error}</div>}
	<form onSubmit={signUpUser}>
		<div className="form-control">
			<label htmlFor="name"> Name</label>
			<input value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required/>
		</div>
		<div className="form-control">
			<label htmlFor="email"> Email</label>
			<input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
		</div>
		<div className="form-control">
			<label htmlFor="password"> Password</label>
			<input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
		</div>
		{/* <input type="submit" className="btn" value="Sign Up"/> */}
		<button className="btn" disabled={isLoading}>Sign Up</button>
	</form>
</div>
	)
}

// SignUp.propTypes = {
// 	setLoginError: PropTypes.func.isRequired
// }

// export default Register;