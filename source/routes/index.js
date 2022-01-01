const express = require('express');
const {obtenerMascotasById} = require('../sqlLiteManager');
const {dataPath} = require('../data.js');

const router = express.Router();
router.get('/',(req,res)=>{
    res.render('login', {
        title:'Inicio'
    });
});

router.get('/sing_out',(req,res)=>{
    res.render('sing_out',{
        title:'Sing Up'
    })
});

router.get('/login',(req,res)=>{
    res.render('login',{
        title:'Login'
    })
});

router.get('/dropPet',(req,res)=>{
    res.render('dropPet',{
        title:'Pon en adopción :3'
    })
});
router.get('/home',(req,res)=>{
    res.render('home');
});


router.get('/publicaciones',(req,res)=>{
    res.render('posts');
});

router.get('/adoptar',(req,res)=>{
    const data = {
        petName:'Carlos',
        description:'simon soy un perro xd',
        phone:'0987654321'
    }
    res.render('adoptar',{data:data});
});
const fs = require('fs');
router.get('/adoptar/:id',(req,res)=>{
    obtenerMascotasById(req.params.id,(dataPet, isFound)=>{
        console.log(dataPath);
        const petImg = fs.readFileSync(dataPath + dataPet[0].URL_IMG,'base64',(err,dataImg)=>{
            if(err) console.log(err);
            else{
                res.render('adoptar', {data:data})
            }
        })
        const data = {
            petName:dataPet[0].TITLE,
            description:dataPet[0].DESCRIPTION,
            phone:'0987654321',
            img:`data:image/png;base64, ${petImg}`
        }
        res.render('adoptar', {data:data})
    })
})



router.get('/tusPost',(req,res)=>{
    res.render('tusPublicaciones');
});

module.exports = router;