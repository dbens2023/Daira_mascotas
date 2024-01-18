const {check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('name')
        .exists()   /**indica que debe de existir el campo name */
        .not().isEmpty()         /**indica que el campo name no sea basio */
        .isLength({ min: 4 }),

    check('lastName')
        .exists() 
        .not().isEmpty()
        .isLength({ min: 4 }),

    check('date')
        .exists()  
        .not().isEmpty(),

    check('tell')
        .exists(),

    check('email')
        .exists()  
        .not().isEmpty()
        .isEmail(),

    (req, res, next) => {
        validateResult(req, res, next);
    }

]

module.exports = { validateCreate }