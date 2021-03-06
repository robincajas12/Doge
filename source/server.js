const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const {validarUser} = require('./js/sign_up');
const fileUpload = require('express-fileupload');
const {iniciarSession, registrarPost, obtenerMascotas, obtenerMascotasById} = require('./sqlLiteManager');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
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
        console.log(isLoggin);
        if(isLoggin) res.redirect('/home')
        else res.redirect('/login');
    });
})
const pathSubirMedia = __dirname + '/db/recursos_doge/img_publicaciones/';
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
                if(isPostRegistrado) res.redirect('home');
                else res.send('Error');
            });
        }
    });
});







//Rest Api
app.get('/api/dogs', (req,res)=>{
    let arryMascotas = [];
    obtenerMascotas((info, thereIsInfo)=>{
        if(thereIsInfo){
            info.forEach(mascota => {
                const data = fs.readFileSync(pathSubirMedia+mascota.URL_IMG,'base64',(err,data)=>{
                });
                arryMascotas.push({
                    id:mascota.ID,
                    title:mascota.TITLE,
                    description: mascota.DESCRIPTION,
                    urlImg:data
                })
            });
            res.json(arryMascotas);
        }
    });
})
app.get('/api/dogs/:id', (req,res)=>{
    let arryMascotas = [];
    const id = req.params.id;
    obtenerMascotasById(id,(info, thereIsInfo)=>{
            res.json({info:info});
    });
});
app.post('/api/user', (req,res)=>{
    const dataSession = {
        email:req.body.email,
        password: req.body.password
    }
    iniciarSession(dataSession, (row, isTrue)=>{
        console.log(isTrue);
        res.json({isLogin:isTrue});
    })
});










//Router
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, 'public')));
//Listeing the server
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Oh! me estoy corriendo en un servidor xd');
});


function pathDbImg(){
    return pathSubirMedia;
}
exports.pathDbImg = pathDbImg;