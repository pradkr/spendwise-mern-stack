import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {IndianRupee} from "../utils/FormattedCurrencyDate";

export const Income = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const income  = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  // const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
  return (
    // <div className="box middle">
        <div className="small-box">
          <h4>Income</h4>
          <p className="money income">{IndianRupee.format(income)}</p>
        </div>
    // </div>
  )
}
