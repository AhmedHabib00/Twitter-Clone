const {check } = require('express-validator');
module.exports = {
    validateDOB : check('birthdate')
    .exists()
    .trim()
    .isDate()
    .withMessage('birthdate must bein the form YYYY/MM/DD'),

    validateEmail: check('email')
    .exists()
    .isEmail()
    .withMessage('Invalid Email'),

    validateName: check('name')
    .exists()
    .isLength({min:3 ,max:50})
    .withMessage('Invalid name- must be atleast 3 characters and atmost 50'),

    validateCode:check('code')
    .exists(),

    validateUsername: check('username')
    .exists()
    .isLength({min:3 ,max:50})
    .withMessage('Invalid username- must be atleast 3 characters and atmost 50'),

    validatePassword:check('password')
    .exists(),
}
