const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const {validarUser} = require('./js/sign_up');
const fileUpload = require('express-fileupload');
const {iniciarSession, registrarPost} = require('./sqlLiteManager');
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
    validarUser(userData,(estaRegistrado)=>{
        if(estaRegistrado === true) res.render(path.join(__dirname, "views", "login"), {title:'Login'});
        else res.send("No se ha podido");
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
const pathSubirMedia = 'C:/Users/USER/OneDrive/Documentos/PROGRAMACIÓN/recursos_doge/img_publicaciones/';
app.post('/subirPerro', (req,res)=>{
    const mascota = req.files.mascota;
    fs.writeFile(pathSubirMedia + mascota.name, new Buffer.from(mascota.data, "base64"),
    (err)=>{
        if(err) console.log('???-----');
        else {
            registrarPost({
                email:req.body.user,
                password:req.body.clave
            }, {
                url:mascota.name,
                title:req.body.title,
                description:req.body.description
            },(isPostRegistrado)=>{
                if(isPostRegistrado) res.render('home');
                else res.send('Error');
            });
        }
    });
});
//Router
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, 'public')));
//Listeing the server
app.listen(3000),()=>{
    console.log('The server works!');
};