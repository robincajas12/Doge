const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {validarUser} = require('./js/sign_up');
const fileUpload = require('express-fileupload');
const { iniciarSession, subirPost, obtenerPerro } = require('./js/sqlconnexion');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.post('/register', (req,res)=>{
    let userData = {
        username : req.body.username,
        numero : req.body.numero,
        email : req.body.email,
        password : req.body.password
    }
    validarUser(userData,(data)=>{
        res.send(data);
    })
})
app.post('/login',(req,res)=>{
    let dataSession = {
        email: req.body.email,
        password: req.body.password
    }
    iniciarSession(dataSession, (respuesta, isLoggin)=>{
        res.send(isLoggin);
    });
})

app.post('/subirPerro',(req,res)=>{
    subirPost(req.files.mascota.data.toString('base64'));
    obtenerPerro((result)=>{
        res.send(`<img src="data:image/png;base64,${result.recordset[0].IMG}">`);
    })
});


//Router
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, 'public')));
//Listeing the server
app.listen(3000),()=>{
    console.log('The server works!');
};