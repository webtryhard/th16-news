var express = require('express');
var subModel = require('../models/subcriber.model');

var routers = express.Router();

routers.get('/:Sub_ID', function(req, res) {
    var idS = req.params.Sub_ID;

    var p2 = subModel.getLatestNews();
    var p3 = subModel.getTop10Cat();
    var p4 = subModel.getNewsTop10Cat();
    var p5 = subModel.getNewsInWeek();

    Promise.all([p2, p3, p4, p5]).then(([rows2, rows3, rows4, rows5]) => {

        var latestNews1 = [rows2[0], rows2[1]];
        var latestNews2 = [];

        for (i = 2; i <= 10; i++) {
            if (rows2[i])
                latestNews2.push(rows2[i]);
        }

        var topCat = [];

        for (i = 0; i < 10; i += 2) {
            var obj = [];
            obj.push(rows3[i]);
            obj.push(rows3[i + 1])
            var new1 = [];
            var new2 = [];
            for (j = 0; j < rows4.length; j++) {
                if (rows4[j].CatID === rows3[i].CatID) {
                    new1.push(rows4[j]);
                }

                if (rows4[j].CatID === rows3[i + 1].CatID) {
                    new2.push(rows4[j]);
                }
            }

            obj.push(new1);
            obj.push(new2);
            topCat.push(obj);
        }

        var newsHotWeek1 = rows5[0],
            newsHotWeek2 = [];
        for (i = 1; i < 5; i++) {
            if (rows5[i]) {
                newsHotWeek2.push(rows5[i]);
            }
        }
        res.render('vwSubcriber/subcriber.hbs', {
            layout: 'subcriber.hbs',
            title: 'Trang chủ của độc giả',
            newsHot: res.newsHot,
            categories: res.categories,
            menu: res.menu,
            latestNews1, latestNews2, topCat, newsHotWeek1, newsHotWeek2, idS,
            style: ['style1.css', 'style2.css', 'login.css', 'signup.css'],
            js: ['jQuery.js', 'js.js', 'login-register.js'],
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:Sub_ID/list/:CatID', (req, res) => {
    var idC = req.params.CatID;
    var idS = req.params.Sub_ID;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 10;
    var offset = 3 + (page - 1) * limit;
    var newsList1 = new Array();
    var newsList2 = new Array();

    var p1 = subModel.getCatAndChillByCatID(idC);
    var p2 = subModel.getNewsByCat(idC);
    var p4 = subModel.getAllTagsManyNews(idC, offset + 3, limit - 3);
    var p5 = subModel.countNewsByCat(idC);

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

        res.render('vwSubcriber/sub_list.hbs', {
            catName: rows,
            newsHot: res.newsHot,
            categories: res.categories,
            menu: res.menu,
            newsHead1: [rows2[0]],
            newsHead2: [rows2[1], rows2[2]],
            newsList1, newsList2, pages, first, last, prev, next, idS,
            layout: 'subcriber.hbs',
            title: 'Trang danh sách độc giả',
            style: ['style1.css', 'style2.css', 'login.css', 'signup.css'],
            js: ['jQuery.js', 'js.js', 'login-register.js'],
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:Sub_ID/list/detail/:News_ID', (req, res) => {
    var idN = req.params.News_ID;
    var idS = req.params.Sub_ID;
    var p1 = subModel.getSingleNews(idN);
    p1.then(rows1 => {
        var p2 = subModel.getCatOfNews(rows1[0].CatID);
        var p3 = subModel.getWriterOfNews(rows1[0].Writer_ID);
        var p4 = subModel.getAllTagsOfNews(rows1[0].News_ID);
        var p5 = subModel.getNewsSameCat(rows1[0].CatID, rows1[0].News_ID);
        var p6 = subModel.getComment(idN);

        Promise.all([p2, p3, p4, p5, p6]).then(([rows2, rows3, rows4, rows5, rows6]) => {
            res.render('vwSubcriber/sub_detail.hbs', {
                singlenews: rows1[0],
                singlecategory: rows2[0],
                singlewriter: rows3[0],
                tags: rows4,
                newsSameCat: rows5,
                comment: rows6,
                newsHot: res.newsHot,
                menu: res.menu,
                categories: res.categories,
                idS,
                layout: 'subcriber.hbs',
                title: 'Bài viết chi tiết độc giả',
                style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'comment.css'],
                js: ['jQuery.js', 'js.js', 'login-register.js'],
                logo: 'logo.png'
            });
        }).catch(err => {
            console.log(err);
        });
    })
})


module.exports = routers;