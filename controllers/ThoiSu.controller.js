var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/', (req, res) => {
    var p = thoisuModel.getNews(1);
    p.then(rows => {
        //console.log(rows);
        res.render('vwThoiSu/ThoiSu.hbs',{
            singlenews : rows[0]
        });
    }
    ).catch(err => {
        console.log(err);
    });  

    // var p2 = thoisuModel.getCategory(1);
    // p2.then(rows => {
    //     res.render('vwThoiSu/ThoiSuChiTiet.hbs',{
    //         singlecategories : rows
    //     });
    // }
    // ).catch(err => {
    //     console.log(err);
    // });
})

routers.get('/ThoiSuChiTiet', (req, res) => {
    var p = thoisuModel.getNews(1);
    p.then(rows => {
        res.render('vwThoiSu/ThoiSuChiTiet.hbs',{
            singlenews : rows[0]
        });
    }
    ).catch(err => {
        console.log(err);
    });
})

module.exports = routers;