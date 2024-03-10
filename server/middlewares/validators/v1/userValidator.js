const {check, validationResult} = require('express-validator');

exports.validateUser = [
  check('name').trim().escape().notEmpty().withMessage('User name can not be empty!').bail()
  .isLength({min: 2}).withMessage('Minimum 2 characters required in name!').bail(),

  check('email').trim().notEmpty().withMessage('Email adress cannot be empty!').bail().isEmail().normalizeEmail().withMessage('invalid email address!').bail(),

  check('password').notEmpty().withMessage('Invalid password!').isLength({ min: 6 }).withMessage('Minimum 6 characters in password required!').bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json( { errors: errors.array() } );
    next();
  },
];