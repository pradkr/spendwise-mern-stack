import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const Register = () => {
	//const navigate = useNavigate();
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()
		const response = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',},
			body:    JSON.stringify({ name, email, password,}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			console.log('registered successfully. navigating to /login page')
			//navigate('/login');
		}
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<input value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
				<br />
				<input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
				<br />
				<input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
				<br />
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

export default Register;
