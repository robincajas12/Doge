const sqlite3 = require('sqlite3');
const sqlVerbose = sqlite3.verbose();
const path = require('path');

const databaseName = path.join(__dirname,"db","database.db");
const db = new sqlVerbose.Database(databaseName,(err)=>{
    if(err)console.log(err)
    else console.log('Exito conectando a la db')
});
async function obtenerUser(email, username,Columns, task){
    db.all(`SELECT ${Columns} FROM USERS WHERE USERNAME=$username OR EMAIL=$email`,{
        $username:username,
        $email:email
    },(err,row)=>{
        if(err) task(err);
        else task(row);
        console.log('---------------Se ha obtenido el usuario Correctamente-------');
    });
}
async function registrarAlUser(userData) {
    db.run(`INSERT INTO USERS(USERNAME, EMAIL, CLAVE, CELULAR) VALUES($username, $email, $clave, $celular)`,{
        $username:userData.username,
        $email:userData.email,
        $clave:userData.password,
        $celular:userData.numero
    },()=>{
        console.log('--------------Listo!-----------')
    })
}

async function iniciarSession(dataSession, callback) {
    db.all(`SELECT * FROM USERS WHERE EMAIL = $email AND CLAVE=$clave`,{
        $email:dataSession.email,
        $clave:dataSession.password
    }, (err,row)=>{
        console.log(row);
        if(err) callback(null, false)
        else{
            if(row.length != 0) callback(row,true);
            else callback(null ,false);
        }
    })
}
exports.obtenerUser = obtenerUser;
exports.registrarAlUser = registrarAlUser;
exports.iniciarSession = iniciarSession;