const sql = require('mssql');

const config = {
    user:'sa',
    password:'robincajas1006969',
    database:'DOGE',
    server:'localhost',
    options:{
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

async function obtenerUser(email, username,Columns, task)
{
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT ${Columns} FROM USERS WHERE USERNAME='${username}' OR EMAIL='${email}'`);
    task(result);
}

async function registrarAlUser(userData) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`INSERT INTO USERS(USERNAME,EMAIL,CLAVE,CELULAR) VALUES('${userData.username}','${userData.email}','${userData.password}', '${userData.numero}');`);
    task(result);
}

async function iniciarSession(dataSession, callback) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM USERS WHERE EMAIL = '${dataSession.email}' AND CLAVE = '${dataSession.password}'`);
    if(result.recordset.length === 1) callback(result,true);
    else callback(null,false);
}

async function subirPost(dataPost) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`INSERT INTO PUBLICACIONES(ID_USERNAME,IMG,TITULO,DESCRIPCION,VENDIDO) VALUES('1','${dataPost}','SE VENDE aaaa CAN', 'CAN EN BUEN aaaaa ESTADO', 0)`);
}
async function obtenerPerro(callback) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT IMG FROM PUBLICACIONES WHERE ID=13`);
    callback(result);
}
exports.obtenerUser = obtenerUser;
exports.registrarAlUser = registrarAlUser;
exports.iniciarSession = iniciarSession;
exports.subirPost = subirPost;
exports.obtenerPerro = obtenerPerro;
