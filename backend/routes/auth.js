var express = require('express');
var router = express.Router();
const authController = require('../controllers').authController;

router.get('/', authController.listAuth);
router.get('/:id', authController.searchAuth);
router.post('/login', authController.login);


module.exports = router ;