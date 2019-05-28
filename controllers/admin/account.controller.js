var express = require('express');

var router = express.Router();

router.get('/register',(req, res, next)=>{
    res.render('vwAccount/register',{
        layout:'TrangChu.hbs',
        style:['style1.css','style2.css','login.css','signup.css','login-register.css'],
        js:['jQuery.js','js.js','login-register.js'],
        logo:'logo.png'
    });
})

router.post('/register',(req, res, next)=>{
})

module.exports = router;