const jwt       = require('jsonwebtoken')
const bcrypt    = require('bcryptjs')
const dotenv    = require('dotenv');
const User      = require('../../models/v1/user.model')
const connectDB = require('../../config/db');

dotenv.config({ path: './config/config.env'} );
const secret = process.env.SECRETCODE || 'mysupersecretcode900'
//console.log('secrete='+secret)

//const PORT   = process.env.PORT || 5000;

console.log('Starting DB connection');
connectDB();

exports.findUser = async (req, res) => {
	try {
		if ( !req.body.email ) {
			return res.status(400).json({ success: false, status: 'error', error: 'Missing email ID.' })
		}

		const user = await User.findOne( { email: req.body.email } )
		if (user) {
			//return res.status(400).json( { success: false, status: 'error', error: 'User alrready exits.' })
			return res.status(200).json({ success: true, status: 'ok' })
		}
		else {
			return res.status(400).json({ success: false, status: 'error', error: 'User does not exit.' })
		}
	} catch (err) {
		return res.status(500).json({ success: false, status: 'error', error: 'Some error occurred. ' + err })
	}
} 

exports.createUser = async (req, res) => {
	//console.log('Debug: createUser req body='+ JSON.stringify(req.body));
	try {
		const user = await User.findOne( {email: req.body.email} )
		if (user) {
			return res.status(400).json( { success: false, status: 'error', error: 'User already exists.' })
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		})
		return res.status(201).json({ success: true, status: 'ok'})
	} catch (err) {
		return res.status(500).json({ success: false, status: 'error', error: 'Invalid data ' + err })
	}
}


exports.loginUser = async (req, res) => {
	//console.log("Debug: loginUser req body="+JSON.stringify(req.body))
	const user = await User.findOne({ email: req.body.email,})
	if (!user) {
		return res.status(404).json({ success: false, status: 'error', error: 'User does not exit.' })
	}

	const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
	if (isPasswordValid) {
		const token = jwt.sign( { name: user.name,
				                  email: user.email,
			                    }, secret);
		return res.status(200).json({ success: true, status: 'ok', user: token })
	} else {
        console.log('Incorrect password entered.');
		return res.status(403).json({ success: false, status: 'error', user: false })
	}
}


exports.getQuote = async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })
		return res.status(200).json({ success: true, status: 'ok', quote: user.quote })
	} catch (error) {
		//console.log('Error in token '+ JSON.stringify(token) )
		console.log('Error in GET API: ' + error)
		return res.status(500).json({ success: false, status: 'error', error: 'invalid token' })
	}
}

exports.createQuote = async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)
		return res.status(201).json({ success: true, status:'ok'});
		//return res.json({ status: 'ok' })
	} catch (error) {
		console.log('Error in POST API: ' + error);
		return res.status(500).json({ success: false, status: 'error', error: 'invalid token' })
	}
}

// module.exports=createUser
// module.exports=loginUser
// module.exports = {
// 	createUser,
// 	loginUser
// getQuote
// createQuote
//  }