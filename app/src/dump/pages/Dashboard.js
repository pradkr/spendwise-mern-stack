import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import jwt from 'jsonwebtoken'
//import { InvalidTokenError, jwtDecode} from 'jwt-decode'
import { jwtDecode} from 'jwt-decode'


const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;

const Dashboard = () => {
	const navigate = useNavigate();
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')

	async function populateQuote() {
		const req = await fetch(`${URL}/api/quote`, {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json();
		if (data.status === 'ok') {
			setQuote(data.quote)
		} else {
			console.log('Quote not found ' + data.error);
		}
	}

	const isTokenExpired = (insertedAtDate) =>{
		const current_time_secs = Date.now() / 1000;  //Date.now gives milliseconds 
		const secondsInOneWeek = 604800;
		//const secondsInOneHour = 3600;
		if( insertedAtDate < current_time_secs - secondsInOneWeek ) {
			console.log('Token Expired.');
			// localStorage.removeItem("token");
			// navigate('/login', { replace: true })
			return true;
		}
		return false;
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const user = jwtDecode(token, {header: false})
				// valid token format
				if (!user || isTokenExpired(user.iat)) {
					localStorage.removeItem('token')
					navigate('/login', { replace: true })
				} else {
					//console.log('decoded token='+ JSON.stringify(user))
					populateQuote()
				}
			} catch(error) {
				//InvalidTokenError
				console.log('Invalid token. ' + JSON.stringify(error) )
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function updateQuote(event) {
		event.preventDefault()
		const req = await fetch(`${URL}/api/quote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			console.log('Could not update quote '+ data.error)
		}
	}

	return (
		<div>
			<button onClick="logOut">Logout</button>
			<h1>Your quote: {quote || 'No quote found'}</h1>
			<form onSubmit={updateQuote}>
				<input value={tempQuote} type="text" placeholder="Quote" 
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
			</form>
		</div>
	)
}

export default Dashboard;
