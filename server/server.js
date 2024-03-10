//const colors  = require('colors');
const path    = require('path'); //needed for static files after build
const express = require('express');
const dotenv  = require('dotenv');
const morgan  = require('morgan');
const cors    = require('cors')  //needed only on local machine due to diff in ports, on prod it will be same
const connectDB    = require('./config/db');
const transactions = require('./routes/v1/transactions');
const users        = require('./routes/v1/users');
//const controllers  = require('./controllers/v1/1-controllers')

dotenv.config({ path: './config/config.env'} );
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors()) //only in local machine where ports are diff
}

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')
        ));
}

app.use('/api/v1/transactions', transactions);
app.use('/api/v1/user/', users);
// app.post('/api/v1/user/register', controllers.createUser);
// app.post('/api/v1/user/login', controllers.loginUser);
// app.get( '/api/v1/user/quote', controllers.getQuote);
// app.post('/api/v1/user/quote', controllers.createQuote);

app.listen(PORT, console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        //.green.bold
));

// console.log('Starting DB connection');
// connectDB();