
import { useState } from 'react'

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch(`${URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			console.log('Login successful')
			window.location.href = '/dashboard'
		} else {
			console.log('Invalid login credentials')
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login;