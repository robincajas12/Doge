const { obtenerUser, registrarAlUser} = require("./sqlconnexion");

function validarUser(userData, callback) {
    obtenerUser(userData.email, userData.username, '*', (data)=>{
        if(data.recordset.length != 0) callback(false);
        else {
            registrarAlUser(userData);
            callback(true);
        }
    });
}

exports.validarUser = validarUser;