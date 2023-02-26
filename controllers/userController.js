const User = require('../models/user');
const { authService, userService } = require('../services');
const { validationResult } = require('express-validator');

const login = async (req, res) => {
    const { email, password } = req.body;

    const resultValidation = validationResult(req);
    const hasError = !resultValidation.isEmpty();

    if(hasError){
        return res.status(400).send(resultValidation);
    }

    const result = await userService.login(email, password).catch(error => error);
    return res.status(result.status).send(result);
}

const register = async (req, res) => {
    const { email, password } = req.body;

    const resultValidation = validationResult(req);
    const hasError = !resultValidation.isEmpty();

    if(hasError){
        return res.status(400).send(resultValidation);
    }

    const result = await userService.register(email, password).catch((error) => error);
    return res.status(result.status).send(result);

}

const konNichiwa = (req, res) => {
    res.status(200).send('Usted está autenticado correctamente')
}

module.exports = {
    login,
    register,
    konNichiwa
}