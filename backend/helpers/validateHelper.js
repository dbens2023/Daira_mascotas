const { validationResult} = require('express-validator');

const validateResult = ( req, res, next ) => {
    try {
        /**si se cumple la validacion lo deja pasar */
        validationResult(req).throw();
        return next();

    } catch (error) {
        // res.status(403).res.send({ errors: error.array() });
        return res.status(500).json({
            status: 'error',
            name: "validation error",
            message:'error check the fields and check syntax',
        },
            res.send({ errors: error.array()})
        )
    }
}
module.exports = { validateResult };