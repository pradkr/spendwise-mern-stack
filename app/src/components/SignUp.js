import PropTypes from 'prop-types';
import React, { useState } from 'react'

import {loginUser 
	//, loginUser1
  } from './App/useLogin';

const HOST = process.env.HOST_BE || 'http://localhost:5000'

// async function loginUser(credentials) {
//   return await fetch(`${HOST}/api/v1/user/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials)
//   })
//   .then( data => data.json() )
//   .catch( err => console.log(err) )
// }

export default function Register  ({ setToken }) {
	//const navigate = useNavigate();
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()
		
		validateForm(event);

		const response = await fetch(`${HOST}/api/v1/user/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',},
			body:    JSON.stringify({ name, email, password,}),
		})
  
		const data = await response.json()

		if (data.status === 'ok') {
			console.log('registered successfully. navigating to /login page')
			//navigate('/login');
			const token = await loginUser({ email, password });
			setToken(token);
			//console.log('token=' + JSON.stringify(token) )
		}
		else
		{
			console.log('Sign Up failed.')
			setToken(null);
		}
  }

  function validateForm() {
	const inputs = document.querySelectorAll("input, select, textarea");

	inputs.forEach(input => {
		input.addEventListener("invalid",
			event => {
				input.classList.add("error");
			},
			false
		);
	});
  }

	return (
	<div>
	<h1>Sign Up</h1>
	<form onSubmit={registerUser}>
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
	<input type="submit" value="Sign Up"/>
	</form>
	</div>
	)
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired
}

// export default Register;