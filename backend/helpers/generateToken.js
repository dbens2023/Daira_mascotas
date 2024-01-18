const jwt = require('jsonwebtoken');

/**este metodo genera el token */
const tokenSign = async(user) => {
    return jwt.sign({
        _id: user.id,
        roll:user.roll
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
    
    );
}

const verifyToken = async(token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}


module.exports = { tokenSign, verifyToken }