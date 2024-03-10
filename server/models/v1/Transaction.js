const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    //email: { type: String, trim: true, required: [true, 'Missing transaction text'] },
    email: { type: String, lowercase: true, trim: true, required: [true, "Missing email"], match: [/\S+@\S+\.\S+/, 'email is invalid'], 
      //index: true,
      //unique: true,
    },
    text:  { type: String, trim: true, required: [true, 'Missing transaction text'] },
    amount: { type: Number, required: [true, 'Missing transaction amount'] },
    type: {  type: String, trim: true, enum: { values: ['expense', 'income'], message: 'Invalid transaction type {VALUE}' }, required: [true, 'Missing transaction type'] },
    datetime: { type: Date, default: Date.now }

},
{ timestamps: true, collection: 'transactions' }
);

module.exports = mongoose.model('Transaction', TransactionSchema);