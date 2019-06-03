var express = require('express');
var routers = express.Router();

routers.get('/', (req, res) => {
   
        //console.log(rows);
        res.render('vwAdmin/AdminQuanLyChuyenMuc.hbs',{
            layout:'Admin.hbs',
            title:'Admin',
            style:['style1.css','style2.css','login.css','signup.css'],
            js:['jQuery.js','js.js'],
            logo:'logo.png'
        });
    }
)

module.exports = routers;