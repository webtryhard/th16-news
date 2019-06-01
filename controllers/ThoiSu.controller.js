var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/:id', (req, res) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 10;
    var offset = 3 + (page - 1) * limit;
    var news3 = new Array();
    var tags = new Array();

    var p1 = thoisuModel.getCatAndChillByCatID(id);
    var p2 = thoisuModel.getNewsByCategory(id);
    var p3 = thoisuModel.getNewsHot();
    var p4 = thoisuModel.getAllTagsManyNews(offset, limit - 3);
    Promise.all([p1, p2, p3, p4]).then(([rows, rows2, rows3, rows4]) => {
        for (i = offset + 3; i < offset + limit; i++) {
            news3[i] = rows2[i];
        }

        res.render('vwThoiSu/ThoiSu.hbs', {
            catName: rows,
            newsHot: rows3,
            newsHead1: [rows2[0]],
            newsHead2: [rows2[1], rows2[2]],
            newsList1: [rows2[offset], rows2[offset + 1], rows2[offset + 2]],
            newsList2: news3,
            tags: rows4,
            layout: 'TrangChu.hbs',
            title: 'Trang danh sách',
            style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'login-register.css'],
            js: ['jQuery.js', 'js.js', 'login-register.js'],
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/detail/:id', (req, res) => {
    var id = req.params.id;

    var p = thoisuModel.getSingleNews(id);
    p1.then(rows1 => {
        var p2 = thoisuModel.getCategoryOfNews(rows1[0].CatID);
        var p3 = thoisuModel.getWriterOfNews(rows1[0].Writer_ID);
        var p4 = thoisuModel.getAllTagsOfNews(rows1[0].News_ID);
        var p5 = thoisuModel.getNewsSameCategory(rows1[0].CatID, rows1[0].News_ID);
        var p6 = thoisuModel.getNewsHot();
        Promise.all([p2, p3, p4, p5, p6]).then(([rows2, rows3, rows4, rows5, rows6]) => {
            res.render('vwThoiSu/ThoiSuChiTiet.hbs', {
                singlenews: rows1[0],
                singlecategory: rows2[0],
                singlewriter: rows3[0],
                tags: rows4,
                newsSameCat: rows5,
                newsHot: rows6,
                layout: 'TrangChu.hbs',
                title: 'Bài viết chi tiết',
                style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'login-register.css'],
                js: ['jQuery.js', 'js.js', 'login-register.js'],
                logo: 'logo.png'
            });
        }).catch(err => {
            console.log(err);
        });
    })
})


module.exports = routers;