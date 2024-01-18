const bcrypt = require('bcryptjs');

/** colocaremos dos metodos el primero encripta la contraseña
 * el segundo compara
*/
const encrypt = async (textPplain) => {
    const hash = await bcrypt.hash(textPplain,10);
    return hash;
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

module.exports = {encrypt, compare}