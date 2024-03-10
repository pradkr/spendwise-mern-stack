const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction}  = require('../../controllers/v1/transactions');
const { validateTransaction } = require('../../middlewares/validators/v1/transactionValidator');

router
    .route('/')
    //.get(getTransactions)
    .post(validateTransaction, addTransaction);

router
    .route('/:id')
    .get(getTransactions)
    .delete(deleteTransaction);

module.exports = router;
