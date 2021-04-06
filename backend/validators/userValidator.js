const {check}=require('express-validator')
exports.userValidate=[
    check('name')
    .not()
    .isEmpty()
    .withMessage('please enter a name'),
    check('email')
    .isEmail()
    .withMessage('please enter a valid email'),
    check('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters long')
]