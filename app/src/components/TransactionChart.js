import React,  { useContext }  from 'react';
// import {Expenses} from "./Expenses_bkp";
// import {Expenses} from "./Expenses";
// import {Income}   from "./Income";
// import {Balance}  from "./Balance";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GlobalContext } from '../context/GlobalState';
import { Doughnut } from "react-chartjs-2";
// import ApexChartComponent from "./ApexChart";

ChartJS.register(ArcElement, Tooltip, Legend);
// const categories = { 'categories': ['Expense', 'Income'] }; 
// const expenseTot = { 'name': 'Expense', 'data': [30,0] };
// const incomeTot  = { 'name': 'Income',  'data': [0,40] };


export const TransactionChart = ({transactionType, ChartLabel}) => {
  // console.log(Data);
  // const [chartData, setChartData] = useState({Data});
  // setChartData(,[]);
  const { transactions } = useContext(GlobalContext);
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '% of Expense category',
        data: [1, 1, 1, 1, 1, 0],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(250, 161, 248, 0.2)', 'rgba(239, 243, 27, 0.2)','rgba(167, 241, 226, 0.2)' ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(250, 161, 248, 1)', 'rgba(239, 243, 27, 1)','rgba(167, 241, 226, 1)' ],
        borderWidth: 1,
      },
    ],
  };
  
  
  const transactionsOfType    = transactions.filter(transaction => transaction.type === transactionType);
  const categoriesBlanksFilled = transactionsOfType.map(transaction => transaction.category ? transaction : {...transaction , 'category': 'undefined'} );
  const categoriesAll  = categoriesBlanksFilled.map(transaction => transaction.category);
  const uniqueSet = new Set(categoriesAll);
  const uniqueArrayOfCategories = [...uniqueSet];
  const uniqueArrayOfCategoriesWithAmount = uniqueArrayOfCategories.reduce((cat_acc, currentCat) => ({
    ...cat_acc,
    [currentCat]: categoriesBlanksFilled.filter(f => f.category === currentCat).reduce((acc, c) => acc + c.amount, 0)
  }), {});

  /*
   * Object.keys is giving us a list of keys in provided object (obj or o), 
   * then we're sorting those using default sorting algorithm, next .reduce is used to convert that array back into an object, 
   * but this time with all of the keys sorted.} 
   * https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
   */
  const sortObject = o => Object.keys(o).sort().reduce((r, k) => {r[k] = o[k]; return r}, {})
  const sortedCategoriesOnKeys = sortObject(uniqueArrayOfCategoriesWithAmount)
  data.labels = Object.keys(sortedCategoriesOnKeys)
  data.datasets[0].data = Object.values(sortedCategoriesOnKeys).map(Math.abs)

  return (
  <>
    <Doughnut data={data} updateMode={'resize'} redraw={true} />
    <div className='chart-label'><h4>{ChartLabel} Breakup by Categories</h4></div>
  </>
  )
}
