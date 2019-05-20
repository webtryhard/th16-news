var express = require('express');
var thoisuModel = require('../models/ThoiSu.model');

var routers = express.Router();

routers.get('/', (req, res) => {
    var p = thoisuModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('vwThoiSu/ThoiSu.hbs');
    }
    ).catch(err => {
        console.log(err);
    })
    
})

module.exports = routers;