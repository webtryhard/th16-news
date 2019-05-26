var express = require('express');
var exphbs  = require('express-handlebars');
var path=require('path');
var port=3000;
 
var app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', '.hbs');
 
app.get('/', function (req, res) {
    res.render('home',{
        layout:'TrangChu.hbs',
        title:'Trang chủ',
        style1:'style1.css',
        style2: 'style2.css',
        style3:'login.css',
        style4:'signup.css',
        js1: 'jQuery.js',
        js2:'js.js',
        logo:'logo.png'
    });
});

var ThoiSu=require('./controllers/ThoiSu.controller');
app.use('/ThoiSu', ThoiSu);

app.listen(port);
console.log('http://localhost:' + port);

