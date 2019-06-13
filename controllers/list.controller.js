var express = require('express');
var listModel = require('../models/list.model');

var routers = express.Router();

routers.get('/:id', (req, res) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 10;
    var offset = 3 + (page - 1) * limit;
    var newsList1 = new Array();
    var newsList2 = new Array();

    var p1 = listModel.getCatAndChillByCatID(id);
    var p2 = listModel.getNewsByCat(id);
    var p4 = listModel.getAllTagsManyNews(id, offset + 3, limit - 3);
    var p5 = listModel.countNewsByCat(id);

    Promise.all([p1, p2, p4, p5]).then(([rows, rows2, rows4, count_rows]) => {

        var total = count_rows[0].total;
        var npage = Math.floor((total - 3) / limit);
        if((total - 3) % limit > 0) npage++;
        var pages = [];

        var prev, next, first, last;
        if(page > 1) 
        {
            prev = page - 1;
            first = 1;
        }

        if(page < npage) 
        {
            next = +page + 1;
            last = npage;
        }

        for(i = page - 1; i <= +page + 1; i++)
        {
            if(i > 0 && i <= npage)
            {
            var obj = {value : i, active : i === +page};
            pages.push(obj);
            }
        }

        for (i = 0; i < 3; i++) {
            if(rows2[offset + i])
            {
            newsList1.push(rows2[offset + i]);
            }
        }
        
        for (i = offset + 3; i < offset + limit; i++) {
            if (rows2[i]) {
                var tags = new Array();
                for (j = 0; j < rows4.length; j++) {
                    if (rows4[j].News_ID === rows2[i].News_ID) {
                        tags.push(rows4[j]);
                    }
                }
                newsList2.push({new: rows2[i], tag : tags});
            }
        }

        res.render('vwNews/list.hbs', {
            catName: rows,
            newsHot: res.newsHot,
            categories: res.categories,
            menu: res.menu,
            newsHead1: [rows2[0]],
            newsHead2: [rows2[1], rows2[2]],
            newsList1, newsList2, pages, first, last, prev, next,
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
    var p1 = listModel.getSingleNews(id);
    p1.then(rows1 => {
        var p2 = listModel.getCatOfNews(rows1[0].CatID);
        var p3 = listModel.getWriterOfNews(rows1[0].Writer_ID);
        var p4 = listModel.getAllTagsOfNews(rows1[0].News_ID);
        var p5 = listModel.getNewsSameCat(rows1[0].CatID, rows1[0].News_ID);
        var p6 = listModel.getComment(id);

        Promise.all([p2, p3, p4, p5, p6]).then(([rows2, rows3, rows4, rows5, rows6]) => {
            res.render('vwNews/detail.hbs', {
                singlenews: rows1[0],
                singlecategory: rows2[0],
                singlewriter: rows3[0],
                tags: rows4,
                newsSameCat: rows5,
                comment: rows6,
                newsHot: res.newsHot,
                menu: res.menu,
                categories: res.categories,
                layout: 'TrangChu.hbs',
                title: 'Bài viết chi tiết',
                style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'login-register.css', 'comment.css'],
                js: ['jQuery.js', 'js.js', 'login-register.js'],
                logo: 'logo.png'
            });
        }).catch(err => {
            console.log(err);
        });
    })
})


module.exports = routers;