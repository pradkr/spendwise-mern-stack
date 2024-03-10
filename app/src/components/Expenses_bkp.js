import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {IndianRupee} from "../utils/FormattedCurrencyDate";

export const Expenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  // const income  = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
  return (
    // <div className="box middle">
        <div className="small-box">
          <h4>Expense</h4>
          <p className="money expense">{IndianRupee.format(expense)}</p>
        </div>
    // </div>
  )
}
