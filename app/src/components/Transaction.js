import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import {IndianRupee, IndianDate} from "../utils/FormattedCurrencyDate";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  //const sign = transaction.amount < 0 ? '-' : '+';
  //console.log(transaction, transaction.type, typeof(transaction.amount), transaction.amount, IndianRupee.format(transaction.amount));
  //console.log(GlobalContext._currentValue);
  return (
    <li className={(transaction.amount < 0 || transaction.type === 'expense' ) ? 'expense' : 'income'}>
      <div className='trxn-name-amount'><div>{transaction.text}</div><div>{IndianRupee.format(transaction.amount)}</div></div>
      {/* <div className='trxn-date-time'>{transaction.datetime}</div> */}
      <div className='trxn-date-time'>{IndianDate.format(Date.parse(transaction.datetime))}</div>
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">Delete</button>
    </li>
  )
}
