import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {IndianRupee} from "../utils/FormattedCurrencyDate";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  return (
    <div className='small-box'>
      <h4>Balance</h4>
      <p className='money balance'> {IndianRupee.format(total)}</p>
    </div>
  )
}
