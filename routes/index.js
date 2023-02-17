const express = require('express');
const routes = express.Router();

const { userController } = require('../controllers');
const { isAuth } = require('../middlewares');

const { userSchema } = require('../controllers/schemas');

routes.post('/login', userSchema, userController.login);
routes.post('/register', userController.register);

routes.get('/hi', isAuth, userController.sayHi);

module.exports = routes;