import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import '../checkbox.css';
// import '../App.css';
//import { v4 as uuidv4 } from 'uuid';

export const AddTransaction = ({email}) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [trxnType, setTrxnType] = useState('expense');
  const [error, setError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);

  //console.log('in addTransactions, email=' + JSON.stringify(email) )
  if(!email){  
    setEmailError(true);
    //console.log('No email found, errorEmail='+errorEmail)
  }
  
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      // id: Math.floor(Math.random() * 100000000),
      //id: uuidv4(), //mongodb will generate its own id
      email,
      text,
      amount: trxnType === 'expense' ? -amount: +amount,
      type: trxnType,
      //datetime: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric',timeZoneName: 'short'})
    }

    
    if ( amount && !isNaN(amount) && (amount > 0) ) {
      setError(false);
      addTransaction(newTransaction);
    }    
    else {
      setError(true);
    }   
  }

  return (
    <div className='box right'>
      <h4>Add new transaction</h4>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." step="any" required/>
        </div>
        <div>
          <div className="dpx">
            <div className="py">
            Transaction Type
              <label htmlFor="trxnType">
                <input type="radio" value="expense" className="option-input radio" name="trxnType" onChange={(e) => setTrxnType(e.target.value)} defaultChecked />
                Expense
              </label>
              <label>
                <input type="radio" value="income" className="option-input radio" name="trxnType" onChange={(e) => setTrxnType(e.target.value)} />
                Income
              </label>
            </div>
          </div>
        </div>
        {(error) && (<div className="error">Please add a valid amount.</div>)}
        {(errorEmail) ? (<div className="error">Please login again.</div>) : null}
        <button className="btn">Add transaction</button>
      </form>
    </div>
  )
}
