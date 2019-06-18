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
    var p4 = writerModel.getAllTag();
    Promise.all([p1, p2, p3, p4]).then(([row1, row2, row3, row4]) => {
        res.render('vwWriter/add.hbs', {
            new: row2,
            writer: row1[0],
            cat: row3,
            tag: row4,
            layout: 'writer.hbs',
            title: 'Đăng bài',
            logo: 'logo.png',
        });
    }).catch(err => {
        console.log(err);
    });

})

routers.post('/:id/add', (req, res) => {
    var list = req.body.TagID;
    var id = req.params.id;
    var entity = [];

    if (typeof list !== 'undefined') {
        var p = writerModel.getLastNewsID();
        p.then((row) => {
            var News_ID = row[0].News_ID + 1;

            for (i = 0; i < list.length; i++) {
                entity.push({
                    News_ID: News_ID,
                    TagID: list[i]
                })
            }
            for (i = 0; i < entity.length; i++) {
                writerModel.addTag(entity[i]);
            }
        })

    }

    var entity2 = {
        Writer_ID: id,
        CatID: req.body.CatID,
        News_Name: req.body.News_Name,
        Summary: req.body.Summary,
        Time: req.body.Time,
        State_ID: 1,
        Image_Avatar: req.body.Image_Avatar,
        Content: req.body.Content,
    }

    writerModel.addNew(entity2).then(n => {
        res.redirect('/writer/' + id);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

routers.get('/:ids/detail/:id', (req, res) => {
    var ids = req.params.ids;
    var id = req.params.id;
    var p = writerModel.singleNew(id);
    var p2 = writerModel.getAllNewState();
    var p3 = writerModel.getAllCat();
    var p4 = writerModel.singleUser(ids);

    Promise.all([p, p2, p3, p4]).then(([rows, row2, row3, row4]) => {
        res.render('vwWriter/detail.hbs', {
            news: rows[0],
            newState: row2,
            writer: row4[0],
            cat: row3,
            error: false,
            layout: 'writer.hbs',
            title: 'Xem chi tiết bài viết',
            logo: 'logo.png',
        });
    }).catch(err => {
        console.log(err);
    });
})


routers.get('/:ids/edit/:id', (req, res) => {
    var ids = req.params.ids;
    var id = req.params.id;
    var p = writerModel.singleNew(id);
    var p2 = writerModel.getAllNewState();
    var p3 = writerModel.singleCat(id);
    var p4 = writerModel.singleUser(ids);
    var p5 = writerModel.singleTag(id);

    Promise.all([p, p2, p3, p4, p5]).then(([rows, row2, row3, row4, row5]) => {
        res.render('vwWriter/edit.hbs', {
            news: rows[0],
            newState: row2,
            writer: row4[0],
            cat: row3[0],
            tag: row5,
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