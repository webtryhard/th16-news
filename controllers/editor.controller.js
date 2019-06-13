var express = require('express');
var editorModel = require('../models/editor.model');

var routers = express.Router();

routers.get('/:id', (req, res) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 10;
    var offset = 3 + (page - 1) * limit;
    
    var p1 = editorModel.getDraft(1);

    Promise.all([p1]).then( ([rows1]) => {
    res.render('vwEditor/editor.hbs', {
        layout: 'editor.hbs',
        title: 'Editor',
        logo: 'logo.png',
        style: ['style1.css', 'style2.css', 'editor.css'],
        js: ['jQuery.js', 'js.js'],
        draft: rows1,
    });
})
})


module.exports = routers;