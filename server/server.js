//const colors  = require('colors');
const path    = require('path'); //needed for static files after build
const express = require('express');
const dotenv  = require('dotenv');
const morgan  = require('morgan');
const cors    = require('cors')  //needed only on local machine due to diff in ports, on prod it will be same
//const connectDB    = require('./config/db');
const transactions = require('./routes/v1/transactions');
const users        = require('./routes/v1/users');
//const controllers  = require('./controllers/v1/1-controllers')

dotenv.config({ path: './config/config.env'} );
const PORT = process.env.PORT || 5000;

//console.log('Starting DB connection');
//connectDB(process.env.REACT_APP_MONGODB_URL);

const app = express();

const jsonParserMiddleware = async(req, res, next) => {
    //for GET no need to throw error as body is not needed there, just pass it on to next middleware
    if (!req.body || typeof req.body !== 'string') {
      next(); 
      return;
    }

    try {
      req.body = JSON.parse(req.body);
      next();
    } catch (e) {
      res.sendStatus(500).json({ msg: 'Invalid data.' });
    }
  };

app.use(jsonParserMiddleware); //server crashes if json is not valid. handle it

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    let corsOptions = {
        origin: ["http://localhost:3000"],
        optionsSuccessStatus: 200 // For legacy browser support
    }
    // app.use(cors({
    //     origin: ['http://localhost:5000', 'http://localhost:3000']
    // })) //only in local machine where ports are diff
    app.use(cors(corsOptions)); 
    console.log('In development mode');
}


app.use('/api/v1/transactions', transactions);
app.use('/api/v1/user/', users);
// app.post('/api/v1/user/register', controllers.createUser);
// app.post('/api/v1/user/login', controllers.loginUser);
// app.get( '/api/v1/user/quote', controllers.getQuote);
// app.post('/api/v1/user/quote', controllers.createQuote);


//While deployment on render.com if you see such an error, make sure the static build folder is correct
//Error: ENOENT: no such file or directory, stat '/opt/render/project/src/server/client/app/index.html'
if(process.env.NODE_ENV === 'production') {
    //app.use(express.static('app/build'));
    app.use(express.static('build'));
    //app.get('*', (req, res) =>
    ///^\/$/
    app.get( '*', (req, res) => res.sendFile( path.resolve(__dirname, 'build', 'index.html') ) );
}

app.listen(PORT, console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        //.green.bold
));

app.on('error', (err) => {
    console.error('Error in server.js: ' + err)
        //.red.bold
    }
);

// console.log('Starting DB connection');
// connectDB();