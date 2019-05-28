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

routers.get('/ThoiSuChiTiet/:id', (req, res) => {
    var id = req.params.id;
    var p = thoisuModel.getNews(id);
    p.then(rows => {
        var p2 = thoisuModel.getCategoryByNews(rows[0].CatID);
        p2.then(rows2 => {
            var p3 = thoisuModel.getWriterByNews(rows[0].Writer_ID);
            p3.then(rows3 => {
                var p4 = thoisuModel.getAllTagsByNews(rows[0].News_ID);
                p4.then(rows4 => {
                    res.render('vwThoiSu/ThoiSuChiTiet.hbs', {
                        singlenews: rows[0],
                        singlecategory: rows2[0],
                        singlewriter: rows3[0],
                        tags: rows4,
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