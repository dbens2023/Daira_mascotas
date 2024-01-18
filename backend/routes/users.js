var express = require('express');
var router = express.Router();

const usersController = require('../controllers').usersController;
const { validateCreate } = require('../validator/users');
// const { checkAuth } = require('../helpers/middlewareAuth');
// const { checkRollAuth } = require('../helpers/middlewareRoll');

/**para que funciones los roles necesitas hacer el controlador para mirar cuales son los roles de la tabla */
// router.get('/', checkAuth, checkRollAuth(['']), usersController.listUsers);
router.get('/', usersController.listUsers);

router.post('/', validateCreate, usersController.postUsers);

router.get('/email/:g', usersController.searchUsersEmail);

router.delete('/:id', usersController.deleteUsers);

module.exports = router ;