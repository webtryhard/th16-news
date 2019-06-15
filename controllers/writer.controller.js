var express = require('express');
var router = express.Router();
var writerModel = require('../models/writer.model');

var routers = express.Router();

routers.get('/:id', (req, res) => {
    var id = req.params.id;


    var p2 = writerModel.getAllNew(id);
    var p3 = writerModel.singleUser(id);

    Promise.all([p2, p3]).then(([row2, row3]) => {
        res.render('vwWriter/xemdanhsach.hbs', {
            layout: 'writer.hbs',
            title: 'Writer',
            logo: 'logo.png',
            news: row2,
            writer: row3[0],
        });
    })
})

routers.get('/:id/add', (req, res) => {
    var id = req.params.id;
    var p1 = writerModel.singleUser(id);
    var p2 = writerModel.getAllNew(id);
    var p3 = writerModel.getAllCat();
    Promise.all([p1, p2,p3]).then(([row1, row2,row3]) => {
        res.render('vwWriter/add.hbs', {
            new: row2,
            writer: row1[0],
            cat:row3,
            layout: 'writer.hbs',
            title: 'Đăng bài',
            logo: 'logo.png',
        });
    }).catch(err => {
        console.log(err);
    });

})

routers.post('/:id/add', (req, res) => {
    var id = req.params.id;
    writerModel.addNew(req.body).then(n => {
        res.redirect('/writer/' + id);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

routers.get('/:ids/edit/:id', (req, res) => {
    var ids = req.params.ids;
    var id = req.params.id;
    var p = writerModel.singleNew(id);
    var p2 = writerModel.getAllNewState();
    var p3 = writerModel.getAllCat();
    var p4 = writerModel.singleUser(ids);

    Promise.all([p, p2, p3,p4]).then(([rows, row2, row3,row4]) => {
        res.render('vwWriter/edit.hbs', {
            news: rows[0],
            newState: row2,
            writer: row4[0],
            cat: row3,
            error: false,
            layout: 'writer.hbs',
            title: 'Chỉnh sửa bài viết',
            logo: 'logo.png',
        });
    }).catch(err => {
        console.log(err);
    });
})

routers.post('/:id/update', (req, res) => {
    var id = req.params.id;
    writerModel.updateNew(req.body).then(n => {
        res.redirect('/writer/' + id);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

module.exports = routers;