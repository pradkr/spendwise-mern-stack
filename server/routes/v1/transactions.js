const express = require('express');
const { getTransactions, addTransaction, deleteTransaction}  = require('../../controllers/v1/transactions');
const { validateTransaction } = require('../../middlewares/validators/v1/transactionValidator');
const requireAuth             = require('../../middlewares/validators/v1/requireAuth');

const router = express.Router();
router.use(requireAuth); // only authorized user should be able to fetch

router
    .route('/')
    .get(getTransactions)
    .post(validateTransaction, addTransaction);

router
    .route('/:id')  //GET the email id also in it, or a trasaction ID to delete.
    //.get(getTransactions)
    .delete(deleteTransaction);

module.exports = router;
