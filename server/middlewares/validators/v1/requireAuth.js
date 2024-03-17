const jwt = require('jsonwebtoken')
const dotenv    = require('dotenv');
const User      = require('../../../models/v1/user.model')

dotenv.config({ path: './config/config.env'} );
const secret = process.env.SECRETCODE || 'mysupersecretcode900'
process.env.DEBUG && console.log('secrete in middleware='+secret)


// const secret = process.env.SECRETCODE || 'mysupersecretcode900'

const requireAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers
    if( ! authorization ) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]  //second item in "Bearer dssdfsdff" 
    process.env.DEBUG && console.log('Token from req recieved='+token)
    try {
        process.env.DEBUG && console.log('in try block, secret code='+secret)
        //process.env.DEBUG && console.log('verify output=' + JSON.stringify(jwt.verify(token, secret)))

        const { id, email } = jwt.verify(token, secret)
        process.env.DEBUG && console.log('Token in request had id=' + id);
        
        process.env.DEBUG && console.log('searching for this id=' + id + ' and received result=' +  await User.findById( id, { email: 1, id: 1 } ) )

        //req.user = await User.findById( id ).select('id')          //add user to req to pass on to the next middleware (note it is not req.body, it is req.user only)
        req.user = await User.findById( id, { email: 1, id: 1 } )       //add user to req to pass on to the next middleware
        //req.email = await User.findOne(email).select('email')
        process.env.DEBUG && console.log('req.user=' + JSON.stringify(req.user)); 
        next()
    } catch(error) {
        process.env.DEBUG && console.log('error=' + error);
        return res.status(401).json({error: 'Authorization token could not be verified. ' + error})
    }
}

module.exports = requireAuth