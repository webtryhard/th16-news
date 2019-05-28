var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/', (req, res) => {
    var id = req.params.CatID;
    console.log(id);
    
    var p = thoisuModel.getCategoryOfNews(1);
    p.then(rows => {
        var p6 = thoisuModel.getNewsHot();
        p6.then(rows6 => {
            //console.log(rows);
            res.render('vwThoiSu/ThoiSu.hbs', {
                catName: rows,
                newsHot: rows6,
                layout: 'Admin.hbs',
                title: 'Thời sự',
                style1: 'style1.css',
                style2: 'style2.css',
                style3: 'login.css',
                style4: 'signup.css',
                js1: 'jQuery.js',
                js2: 'js.js',
                logo: 'logo.png'
            });
        })
    }).catch(err => {
        console.log(err);
    });
})

routers.get('/ThoiSuChiTiet/:id', (req, res) => {
    var id = req.params.id;
    var p = thoisuModel.getSingleNews(id);
    p.then(rows => {
        var p2 = thoisuModel.getCategoryOfNews(rows[0].CatID);
        p2.then(rows2 => {
            var p3 = thoisuModel.getWriterOfNews(rows[0].Writer_ID);
            p3.then(rows3 => {
                var p4 = thoisuModel.getAllTagsOfNews(rows[0].News_ID);
                p4.then(rows4 => {
                    var p5 = thoisuModel.getNewsSameCategory(rows[0].CatID, rows[0].News_ID);
                p5.then(rows5 => {
                    var p6 = thoisuModel.getNewsHot();
                    p6.then(rows6 => {
                    res.render('vwThoiSu/ThoiSuChiTiet.hbs', {
                        singlenews: rows[0],
                        singlecategory: rows2[0],
                        singlewriter: rows3[0],
                        tags: rows4,
                        newsSameCat: rows5,
                        newsHot: rows6,
                        layout: 'Admin.hbs',
                        title: 'Bài viết',
                        style1: 'style1.css',
                        style2: 'style2.css',
                        style3: 'login.css',
                        style4: 'signup.css',
                        js1: 'jQuery.js',
                        js2: 'js.js',
                        logo: 'logo.png'
                    });
                })
            })
                }
                )
            }
            )
        }
        )
    }
    ).catch(err => {
        console.log(err);
    });
})

module.exports = routers;