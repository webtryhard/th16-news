var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/', (req, res) => {
    var id = req.params.CatID;
    console.log(id);
    
    var p = thoisuModel.getCategoryOfNews(1);
    p.then(rows => {
        //console.log(rows);
        res.render('vwThoiSu/ThoiSu.hbs',{
            singlenews : rows[0],
            layout:'Admin.hbs',
            title:'Thời sự',
            style:['style1.css','style2.css','login.css','signup.css'],
            js:['jQuery.js','js.js'],
            logo:'logo.png'
        });
    }
    ).catch(err => {
        console.log(err);
    });
})

routers.get('/ThoiSuChiTiet/:id', (req, res) => {
    var id = req.params.id;
    var p = thoisuModel.getSingleNews(id);
    p.then(rows => {
        res.render('vwThoiSu/ThoiSuChiTiet.hbs',{
            singlenews : rows[0],
            layout:'Admin.hbs',
            title:'Bài viết',
            style:['style1.css','style2.css','login.css','signup.css'],
            js:['jQuery.js','js.js'],
            logo:'logo.png'
        });
    }
    ).catch(err => {
        console.log(err);
    });
})

module.exports = routers;