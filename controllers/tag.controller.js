var express = require('express');
var subModel = require('../models/subcriber.model');

var routers = express.Router();

routers.get('/:TagID', (req, res) => {
    var idT = req.params.TagID;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 8;
    var offset = (page - 1) * limit;
    var newsList = new Array();

    var p1 = subModel.viewListFollowTag(idT);

    Promise.all([p1]).then(([rows1]) => {

        var total = rows1.length;
        
        var npage = Math.floor(total / limit);
        if(total % limit > 0) npage++;
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
        
        for (i = offset; i < offset + limit; i++) {
            if (rows1[i]) {
                newsList.push(rows1[i]);
            }
        }
        res.render('vwTag/tag.hbs', {
            menu: res.menu,
            newsList, pages, first, last, prev, next,
            layout: 'TrangChu.hbs',
            title: 'Xem danh sách',
            style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'login-register.css'],
            js: ['jQuery.js', 'js.js', 'login-register.js'],
            logo: 'logo.png'

        }).catch(err => {
            console.log(err);
        });
    })
});

module.exports = routers;