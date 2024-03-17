import React,  { useContext, useEffect, useState }  from 'react';
// import {Expenses} from "./Expenses_bkp";
import {Expenses} from "./Expenses";
import {Income}   from "./Income";
import {Balance}  from "./Balance";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GlobalContext } from '../context/GlobalState';
// import { Doughnut } from "react-chartjs-2";
import ApexChartComponent from "./ApexChart";
import { TransactionChart } from './TransactionChart';

ChartJS.register(ArcElement, Tooltip, Legend);
//const categories = { 'categories': ['Expense', 'Income'] }; 
const expenseTotInit = { 'name': 'Expense', 'data': [30,0] };
const incomeTotInit  = { 'name': 'Income',  'data': [0,40] };

export const IncomeExpenses = () => {
  const [expenseTot, setExpenseTot] = useState(expenseTotInit);
  const [incomeTot,  setIncomeTot]  = useState(incomeTotInit);
  // const [chartData, setChartData] = useState({Data});

  const { transactions } = useContext(GlobalContext);

  const expenses = transactions.filter(transaction => transaction.type === 'expense');
  const expenseTotal = expenses.reduce( (acc, item) => (acc += item.amount), 0); //if DB has all negatives, this total will be negative
  const abs_expenseTotal = Math.abs(expenseTotal)
  useEffect(() => {
    setExpenseTot({ 'name': 'Expense', 'data': [ abs_expenseTotal , 0] });
  }, [abs_expenseTotal]);
  //console.log(expenseTot)

  const income   = transactions.filter(transaction => transaction.type === 'income');
  const incomeTotal  =   income.reduce( (acc, item) => (acc += item.amount), 0);
  useEffect(() => {
    setIncomeTot({ 'name': 'Income',  'data': [0, incomeTotal] });
  }, [incomeTotal]);
 // console.log(incomeTot)
  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '% of Expense category',
  //       data: [1, 1, 1, 1, 1, 0],
  //       backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', ],
  //       borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  // const expenses    = transactions.filter(transaction => transaction.type === 'expense');
  // const categoriesBlanksFilled = expenses.map(transaction => transaction.category ? transaction : {...transaction , 'category': 'undefined'} );
  // const categoriesAll  = categoriesBlanksFilled.map(transaction => transaction.category);
  // const uniqueSet = new Set(categoriesAll);
  // const uniqueArrayOfCategories = [...uniqueSet];

  // const uniqueArrayOfCategoriesWithAmount = uniqueArrayOfCategories.reduce((cat_acc, currentCat) => ({
  //   ...cat_acc,
  //   [currentCat]: categoriesBlanksFilled.filter(f => f.category === currentCat).reduce((acc, c) => acc + c.amount, 0)
  // }), {});

  // /*
  //  * Object.keys is giving us a list of keys in provided object (obj or o), 
  //  * then we're sorting those using default sorting algorithm, next .reduce is used to convert that array back into an object, 
  //  * but this time with all of the keys sorted.} 
  //  * https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  //  */
  // const sortObject = o => Object.keys(o).sort().reduce((r, k) => {r[k] = o[k]; return r}, {})
  // const sortedCategoriesOnKeys = sortObject(uniqueArrayOfCategoriesWithAmount)
  // data.labels = Object.keys(sortedCategoriesOnKeys)
  // data.datasets[0].data = Object.values(sortedCategoriesOnKeys).map(Math.abs)

  return (
    <div className="box middle">
      <div className='middle-upper-cards'>
        <Expenses />
        {/* <Expenses1 /> */}
        <Income />
        <Balance />
      </div>  
      <div className='middle-lower-big'>
          <TransactionChart transactionType={'expense'} ChartLabel={'Expense'}/>
          <TransactionChart transactionType={'income'} ChartLabel={'Income'}/>          
          {/* <Doughnut data={data} updateMode={'resize'} redraw={true} /> */}
          <ApexChartComponent categories={{'categories': ['Expense', 'Income'] }} expenseTot={ expenseTot } incomeTot={ incomeTot } />
          <div className='chart-label'><h4>Expense vs Income</h4></div>
      </div>
    </div>
  )
}
