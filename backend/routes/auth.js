const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

/* GET users listing. */
router.post('/login/', authController.login);
router.post('/', authController.create);

module.exports = router;
