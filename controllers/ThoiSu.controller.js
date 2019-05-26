var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/', (req, res) => {
    var p = thoisuModel.getNews(1);
    p.then(rows => {
        //console.log(rows);
        res.render('vwThoiSu/ThoiSu.hbs',{
            singlenews : rows[0],
            layout:'Admin.hbs',
            title:'Thời sự',
            style1:'style1.css',
            style2: 'style2.css',
            style3:'login.css',
            style4:'signup.css',
            js1: 'jQuery.js',
            js2:'js.js',
            logo:'logo.png'
        });
    }
    ).catch(err => {
        console.log(err);
    });  
})

routers.get('/ThoiSuChiTiet', (req, res) => {
    var p = thoisuModel.getNews(1);
    p.then(rows => {
        res.render('vwThoiSu/ThoiSuChiTiet.hbs',{
            singlenews : rows[0],
            layout:'Admin.hbs',
            title:'Bài viết',
            style1:'style1.css',
            style2: 'style2.css',
            style3:'login.css',
            style4:'signup.css',
            js1: 'jQuery.js',
            js2:'js.js',
            logo:'logo.png'
        });
    }
    ).catch(err => {
        console.log(err);
    });
})

module.exports = routers;