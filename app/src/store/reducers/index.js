import transactionsReducer from './transactionsReducer';
import userReducer from './userReducer';
import {combineReducers} from 'redux'

export default combineReducers ({
    user: userReducer,
    transaction: transactionsReducer
});
