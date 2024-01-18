const {check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('id_client')
        .exists()
        .not().isEmpty()
        .isNumeric()
        .custom((value,{req}) => { /**esta es una validacion personalizada */
            if(value < 1){
                throw new Error ('el id del cliente no puede ser negativo');
            }
        }),

    check('date')
        .exists()  
        .not().isEmpty(),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// const validatorCreateGet = [
//     check("id_facture").exists().notEmpty(),

//     (req, res, next) => {

//         validateResult(req, res, next);
//     }
// ];

module.exports = { validateCreate }