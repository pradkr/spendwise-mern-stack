import React, { createContext, useReducer } from 'react';
import axios from 'axios';

//import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  user: null,
  email: null
}

export const GlobalContext = createContext(initialState);

// reducer
const AppReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [ ...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  // Actions
  async function getTransactions(email) {
    try {
      const res = await axios.get('/api/v1/transactions/' + email);
      if (res && res.data && res.data.data)
      {
        dispatch({
          type: 'GET_TRANSACTIONS',
          payload: res.data.data
        });
      }
    } catch (err) {
      //console.log("payload:", err)
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.resonse.data.error
      });
    }
  }

  async function addTransaction(transaction) { 
    const config = { headers: {'Content-Type': 'application/json'}};
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.resonse.data.error
      });
    }
  }

  return (
  <GlobalContext.Provider 
      value={ { transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                deleteTransaction, 
                addTransaction, 
                getTransactions } }>
    {children}
  </GlobalContext.Provider>);
}