import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';
import { useAuthContext } from '../context/useAuthContext';

export const TransactionList = ({email}) => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const { user } = useAuthContext();
  //console.log('state value in TransactionList is = ', transactions);
  //console.log('user=' + JSON.stringify(user))

  useEffect(() => {
    getTransactions(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='box left'>
      <h4>Transaction History</h4>
      <ul className="list">
        { transactions && transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />)) }
      </ul>
    </div>
  )
}
