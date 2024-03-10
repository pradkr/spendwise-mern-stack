const {check, validationResult} = require('express-validator');

exports.validateTransaction = [
    check('text').trim().escape().notEmpty().withMessage('Transaction text identifier can not be empty!').bail(),
    //.isLength({min: 2}).withMessage('Minimum 2 characters required in name!').bail(),

    check('email').trim().notEmpty().withMessage('Email adress cannot be empty!').bail(), //.isEmail().normalizeEmail().withMessage('invalid email address!').bail(),

    check('amount').notEmpty().withMessage('Amount cannot be empty!').isNumeric().withMessage('Amount should be numeric!').bail(),

    check('type').notEmpty().withMessage('Invalid transaction type, should either be expense or income!').bail(),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json( { errors: errors.array() } );
    next();
    },
];
