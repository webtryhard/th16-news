var express = require('express');

var router = express.Router();

router.get('/register',(req, res, next)=>{
    res.render('vwAccount/register',{
        layout:'TrangChu.hbs'
    });
})

router.post('/register',(req, res, next)=>{
})

module.exports = router;