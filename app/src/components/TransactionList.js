import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = ({email}) => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  //console.log('state value in context is = ', transactions);
  useEffect(() => {
    //console.log('In transactions, {email}='+email);
    //console.log('in transactions, email=' + JSON.stringify(email) )
    getTransactions(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='box left'>
      <h4>Transaction History</h4>
      <ul className="list">
        {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
      </ul>
    </div>
  )
}
