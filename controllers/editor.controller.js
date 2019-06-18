var express = require('express');
var editorModel = require('../models/editor.model');

var routers = express.Router();

routers.get('/:id', (req, res) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 5;
    var offset = (page - 1) * limit;
    var draft = [];

    var p1 = editorModel.getDraft(id, offset);
    var p2 = editorModel.countNewsOfEditor(id);
    var p3 = editorModel.getSingleEditor(id);
    var p4 = editorModel.getCatOfEditor(id);
    var p5 = editorModel.getAllTagsManyNews(id, offset, limit);

    Promise.all([p1, p2, p3, p4, p5]).then(([rows1, rows2, rows3, rows4, rows5]) => {

        var total = rows2[0].total;
        var npage = Math.floor(total / limit);
        if (total % limit > 0) npage++;
        var pages = [];


        var prev, next, first, last;
        if (page > 1) {
            prev = page - 1;
            first = 1;
        }

        if (page < npage) {
            next = +page + 1;
            last = npage;
        }

        for (i = page - 1; i <= +page + 1; i++) {
            if (i > 0 && i <= npage) {
                var obj = { value: i, active: i === +page };
                pages.push(obj);
            }
        }

        var editor = [];
        editor.push({ info: rows3[0], cat: rows4 });

        for (i = 0; i < limit; i++) {
            if (rows1[i]) {
                var tags = [];
                for (j = 0; j < rows5.length; j++) {
                    if (rows5[j].News_ID === rows1[i].News_ID) {
                        tags.push(rows5[j]);
                    }
                }
                draft.push({ new: rows1[i], tag: tags });
            }
        }

        res.render('vwEditor/editor.hbs', {
            draft,
            editor,
            pages, first, last, prev, next,
            layout: 'editor.hbs',
            title: 'Biên tập viên',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:Editor_ID/draft/show/:News_ID', (req, res) => {
    var idE = req.params.Editor_ID;
    var idN = req.params.News_ID;
    var p1 = editorModel.getSingleEditor(idE);
    var p2 = editorModel.getCatOfEditor(idE);
    var p3 = editorModel.getInfoSingleDraft(idN);
    var p4 = editorModel.getAllTagsOfDraft(idN);

    Promise.all([p1, p2, p3, p4]).then(([rows1, rows2, rows3, rows4]) => {

        var editor = [];
        editor.push({ info: rows1[0], cat: rows2 });

        res.render('vwEditor/draft.hbs', {
            editor, idE, idN,
            draft: rows3,
            tags: rows4,
            layout: 'editor.hbs',
            title: 'Xem bài viết nháp',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:Editor_ID/draft/refuse/:News_ID', (req, res) => {
    var idE = req.params.Editor_ID;
    var idN = req.params.News_ID;
    var p1 = editorModel.getSingleEditor(idE);
    var p2 = editorModel.getCatOfEditor(idE);
    var p3 = editorModel.getInfoSingleDraft(idN);
    var p4 = editorModel.getAllTagsOfDraft(idN);

    Promise.all([p1, p2, p3, p4]).then(([rows1, rows2, rows3, rows4]) => {

        var editor = [];
        editor.push({ info: rows1[0], cat: rows2 });

        res.render('vwEditor/refuse_draft.hbs', {
            editor, idE, idN,
            draft: rows3[0],
            tags: rows4,
            layout: 'editor.hbs',
            title: 'Từ chối bài viết',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:Editor_ID/draft/browse/:News_ID', (req, res) => {
    var idE = req.params.Editor_ID;
    var idN = req.params.News_ID;
    var p1 = editorModel.getSingleEditor(idE);
    var p2 = editorModel.getCatOfEditor(idE);
    var p3 = editorModel.getInfoSingleDraft(idN);
    var p4 = editorModel.getAllTagsOfDraft(idN);
    var p5 = editorModel.getAllTags();
    var p6 = editorModel.getAllCat();

    Promise.all([p1, p2, p3, p4, p5, p6]).then(([rows1, rows2, rows3, rows4, rows5, rows6]) => {

        var editor = [];
        editor.push({ info: rows1[0], cat: rows2 });

        res.render('vwEditor/browse_draft.hbs', {
            editor, idE, idN,
            draft: rows3[0],
            tags: rows4,
            allcat: rows6,
            allTags: rows5,
            layout: 'editor.hbs',
            title: 'Duyệt bài viết',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });

});

routers.get('/:id/my_refused_draft', (req, res) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 5;
    var offset = (page - 1) * limit;
    var draft = [];

    var p1 = editorModel.getRefusedDraft(id, offset);
    var p2 = editorModel.countRefusedDraftOfEditor(id);
    var p3 = editorModel.getSingleEditor(id);
    var p4 = editorModel.getCatOfEditor(id);
    var p5 = editorModel.getAllTagsManyRefusedDraft(id, offset, limit);

    Promise.all([p1, p2, p3, p4, p5]).then(([rows1, rows2, rows3, rows4, rows5]) => {

        var total = rows2[0].total;
        var npage = Math.floor(total / limit);
        if (total % limit > 0) npage++;
        var pages = [];


        var prev, next, first, last;
        if (page > 1) {
            prev = page - 1;
            first = 1;
        }

        if (page < npage) {
            next = +page + 1;
            last = npage;
        }

        for (i = page - 1; i <= +page + 1; i++) {
            if (i > 0 && i <= npage) {
                var obj = { value: i, active: i === +page };
                pages.push(obj);
            }
        }

        var editor = [];
        editor.push({ info: rows3[0], cat: rows4 });

        for (i = 0; i < limit; i++) {
            if (rows1[i]) {
                var tags = [];
                for (j = 0; j < rows5.length; j++) {
                    if (rows5[j].News_ID === rows1[i].News_ID) {
                        tags.push(rows5[j]);
                    }
                }
                draft.push({ new: rows1[i], tag: tags });
            }
        }

        res.render('vwEditor/my_refused_draft.hbs', {
            draft,
            editor,
            pages, first, last, prev, next,
            layout: 'editor.hbs',
            title: 'Bài viết đã từ chối',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:id/my_browsed_draft', (req, res) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 5;
    var offset = (page - 1) * limit;
    var draft = [];

    var p1 = editorModel.getBrowsedDraft(id, offset);
    var p2 = editorModel.countBrowsedDraftOfEditor(id);
    var p3 = editorModel.getSingleEditor(id);
    var p4 = editorModel.getCatOfEditor(id);
    var p5 = editorModel.getAllTagsManyBrowsedDraft(id, offset, limit);

    Promise.all([p1, p2, p3, p4, p5]).then(([rows1, rows2, rows3, rows4, rows5]) => {

        var total = rows2[0].total;
        var npage = Math.floor(total / limit);
        if (total % limit > 0) npage++;
        var pages = [];


        var prev, next, first, last;
        if (page > 1) {
            prev = page - 1;
            first = 1;
        }

        if (page < npage) {
            next = +page + 1;
            last = npage;
        }

        for (i = page - 1; i <= +page + 1; i++) {
            if (i > 0 && i <= npage) {
                var obj = { value: i, active: i === +page };
                pages.push(obj);
            }
        }

        var editor = [];
        editor.push({ info: rows3[0], cat: rows4 });

        for (i = 0; i < limit; i++) {
            if (rows1[i]) {
                var tags = [];
                for (j = 0; j < rows5.length; j++) {
                    if (rows5[j].News_ID === rows1[i].News_ID) {
                        tags.push(rows5[j]);
                    }
                }
                draft.push({ new: rows1[i], tag: tags });
            }
        }

        res.render('vwEditor/my_browsed_draft.hbs', {
            draft,
            editor,
            pages, first, last, prev, next,
            layout: 'editor.hbs',
            title: 'Bài viết đã từ duyệt',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.post('/:id/browse/update/:idn', (req, res) => {
    var News_ID = req.params.idn;
    var list = req.body.Tag_selected;
    var entity = [];
    var id = req.params.id;

    if (typeof list !== 'undefined') {
        for (i = 0; i < list.length; i++) {
            entity.push({
                News_ID: News_ID,
                TagID: list[i]
            })
        }

        var p = editorModel.getAllTagsOfDraft(News_ID);

        (p.then(row => {
            for (i = 0; i < row.length; i++) {
                editorModel.deleteTag(News_ID, row[i].TagID);
            }
        })).then(() => {
            for (i = 0; i < entity.length; i++) {
                editorModel.addTag(entity[i]);
            }
        })
    }

    var entity2 = {
        News_ID: News_ID,
        CatID: req.body.CatID,
        Time: req.body.Time,
        State_ID: 2
    }

    editorModel.updateRefuse(entity2).then(n => {
        res.redirect('/editor/' + id);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

routers.get('/:Editor_ID/draft/refused/:News_ID', (req, res) => {
    var idE = req.params.Editor_ID;
    var idN = req.params.News_ID;
    var p1 = editorModel.getSingleEditor(idE);
    var p2 = editorModel.getCatOfEditor(idE);
    var p3 = editorModel.getInfoSingleDraft(idN);
    var p4 = editorModel.getAllTagsOfDraft(idN);

    Promise.all([p1, p2, p3, p4]).then(([rows1, rows2, rows3, rows4]) => {

        var editor = [];
        editor.push({ info: rows1[0], cat: rows2 });

        res.render('vwEditor/refused_draft.hbs', {
            editor, idE, idN,
            draft: rows3,
            tags: rows4,
            layout: 'editor.hbs',
            title: 'Xem chi tiết bài viết đã từ chối',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});

routers.get('/:Editor_ID/draft/browsed/:News_ID', (req, res) => {
    var idE = req.params.Editor_ID;
    var idN = req.params.News_ID;
    var p1 = editorModel.getSingleEditor(idE);
    var p2 = editorModel.getCatOfEditor(idE);
    var p3 = editorModel.getInfoSingleDraft(idN);
    var p4 = editorModel.getAllTagsOfDraft(idN);

    Promise.all([p1, p2, p3, p4]).then(([rows1, rows2, rows3, rows4]) => {

        var editor = [];
        editor.push({ info: rows1[0], cat: rows2 });

        res.render('vwEditor/browsed_draft.hbs', {
            editor, idE, idN,
            draft: rows3,
            tags: rows4,
            layout: 'editor.hbs',
            title: 'Xem chi tiết bài viết đã duyệt',
            logo: 'logo.png',
            style: ['style1.css', 'style2.css', 'editor.css'],
            js: ['jQuery.js', 'js.js'],
        });
    }).catch(err => {
        console.log(err);
    });
});


routers.post('/refuse/update', (req, res) => {

    var entity = {
        News_ID: req.body.News_ID,
        Reason_Refuse: req.body.Reason_Refuse,
        State_ID: 3
    }
    editorModel.updateRefuse(entity).then(n => {
        res.end("thành công rồi");
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
});

module.exports = routers;