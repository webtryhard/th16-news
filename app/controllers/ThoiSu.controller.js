var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/', (req, res) => {
    var p = thoisuModel.getNews(1);
    p.then(rows => {
        //console.log(rows);
        res.render('vwThoiSu/ThoiSuChiTiet.hbs',{
            news : rows[0]
        });
    }
    ).catch(err => {
        console.log(err);
    })  
})

routers.get('/ThoiSuChiTiet', (req, res) => {
        res.render('vwThoiSu/ThoiSuChiTiet.hbs');
})

module.exports = routers;