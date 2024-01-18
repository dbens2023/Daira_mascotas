const { verifyToken } = require('../helpers/generateToken');

const checkAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        console.log("dataToken:",tokenData)
        if(tokenData._id){
            next()
        }
        else{
            res.send({message:"TU POR AQUI NO PASAS!"});
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            name: "TOKEN",
            message: "problemas con la autentificaciones",
            path: error.path
        })
    }
};

module.exports = { checkAuth }

