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

const register = (req, res) => {
    const { email, password } = req.body;

    const newUser = new User({
        email,
        password
    });

    User.findOne({ email: newUser.email }, (error, user) => {
        if(error){
            return res.status(500).send({ message: 'Se produjo un error al registrar el usuario.', error});
        }
        if(user){
            return res.status(400).send({ message: 'El mail ya se encuentra en uso.'});
        }
        newUser.save((error) => {
            if(error){
                res.status(400).send({ message: 'Se produjo un error al registrar el usuario.', error});
            }
            res.status(201).send({ message: 'El registro se completo exitosamente', token: authService.createToken() });
        });
    });
}

const sayHi = (req, res) => {
    res.status(200).send('Usted está autenticado correctamente')
}

module.exports = {
    login,
    register,
    sayHi
}