const { verifyToken} = require('../helpers/generateToken');
const userModel = require('../models/users');

const checkRollAuth = (roll) => async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const userData = await userModel.findById(tokenData._id);

        if([].concat(roll).includes(userData.roll)){
            next();
        }
        else{
            res.send({message:"TU POR AQUI NO PASAS!"});
        }

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            name: "TOKEN ROLL",
            message: "problemas con la autentificaciones ROLL",
            path: error.path
        })
    }
};

module.exports = { checkRollAuth }