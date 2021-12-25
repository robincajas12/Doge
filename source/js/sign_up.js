const {obtenerUser, registrarAlUser} = require('../sqlLiteManager');
function validarUser(userData, callback) {
    obtenerUser(userData.email, userData.username, '*', (data)=>{
        if(data.length != 0) callback(false);
        else{
            registrarAlUser(userData);
            callback(true);
        }
    });
}

exports.validarUser = validarUser;