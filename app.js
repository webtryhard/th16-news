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
        style:['style1.css','style2.css','login.css','signup.css','login-register.css'],
        js:['jQuery.js','js.js','login-register.js'],
        logo:'logo.png'
    });
});

var ThoiSu=require('./controllers/ThoiSu.controller');
app.use('/ThoiSu', ThoiSu);

var Admin=require('./controllers/Admin.controller');
app.use('/Admin', Admin);

app.listen(port);
console.log('http://localhost:' + port);

