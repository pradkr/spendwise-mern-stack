const AppReducer = (state, action) => {
  console.log('action = '+action);
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      console.log('in reducer and val ='+action.payload);
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
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

export default AppReducer;