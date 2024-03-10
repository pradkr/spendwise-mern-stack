const Transaction = require('../../models/v1/Transaction');
// @desc  GET All Transactions
// @route GET /api/v1/transansactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    //res.send('Get Traxns');
    try{
        //console.log('query=' + `"email": "${req.params.id}"`)
        const transactions = await Transaction.find({"email": req.params.id})
        //Transaction.find();
        
        return res.status(200).json({
            success: true,
            count:   transactions.length,
            data:    transactions
        });  
    } catch (err) {
        return res.status(500).json({
            success: false,
            error:   'Error: Failed to get transactions'
        });
    }
}

// @desc  Add a Transactions
// @route POST /api/v1/transansactions
// @access Public
exports.addTransaction = async (req, res, next) => {
    //res.send('Post Traxns');
    try {
        const {text, amount} = req.body;
        const transaction = await Transaction.create(req.body);
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Error: Failed to add data'
            });
        }
    }
}

// @desc  Delete a Transactions
// @route DELETE /api/v1/transansactions
// @access Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction) {
            return res.status(404).json({success: false, error: 'Transaction not found'});
        }
        await transaction.deleteOne();
        return res.status(200).json({success: true, data: {}});
    } catch (err) {
        //const messages = Object.values(err.errors).map(val => val.message);
        return res.status(500).json({success: false, error: 'Server Error' + ": " + err});
    }
}