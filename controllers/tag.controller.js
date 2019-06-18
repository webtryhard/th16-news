var express = require('express');
var subModel = require('../models/subcriber.model');

var routers = express.Router();

routers.get('/', function (req, res) {
    res.render('vwTag/tagButton', {
        layout: 'TrangChu.hbs',
        title: 'Xem danh sách',
        style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'login-register.css'],
        js: ['jQuery.js', 'js.js', 'login-register.js'],
        logo: 'logo.png'
    })
})

module.exports = routers;