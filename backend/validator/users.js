const {check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('id_roll')
        .exists()   /**indica que debe de existir el campo name */
        .not().isEmpty(),         /**indica que el campo name no sea basio */

    check('email')
        .exists()  
        .not().isEmpty()
        .isEmail(),

    check('password')
        .exists() 
        .not().isEmpty()
        .isLength({ min: 8}),

    (req, res, next) => {
        validateResult(req, res, next);
    }

]

module.exports = { validateCreate }