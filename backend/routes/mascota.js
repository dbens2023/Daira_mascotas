var express = require('express');
var router = express.Router();
const mascotaController = require('../controllers').mascotaController;
const uploadFileImg = require('../middleware/multer');

// const { checkAuth } = require('../helpers/middlewareAuth');
// const { checkRollAuth } = require('../helpers/middlewareRoll');

/**para que funciones los roles necesitas hacer el controlador para mirar cuales son los roles de la tabla */
// router.get('/', checkAuth, checkRollAuth(['']), usersController.listUsers);
router.get('/', mascotaController.listMascota);

router.post('/post', uploadFileImg(), mascotaController.postMascota);

router.get('/:id', mascotaController.searchMascota);

router.delete('/delete/:id', mascotaController.deleteMascota);

module.exports = router ;