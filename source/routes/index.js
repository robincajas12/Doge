const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
    res.render('index', {
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
module.exports = router;