const authService  = require('./authService');
const User = require('../models/user');

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email }, (error, user) => {
            if(error){
                reject({ status: 500, message: 'Se produjo un error al registrar el usuario.', error });
            }
            if(!user || !password || !user.comparePassword(password)){               
               reject({ status: 401, message: 'El usuario o clave no son correctos.', error });
            }
            resolve({ status: 200, message: 'Te has logueado correctamente', token: authService.createToken()});
        });
    });
}
const register = () => {

}

module.exports = {
    login,
    register
}