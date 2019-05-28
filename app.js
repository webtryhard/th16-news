var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var dateFormat = require('dateformat');
var path=require('path');
var port=3000;
 
var app = express();

app.use(express.static(path.join(__dirname, '/public')));

dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
    ],
    monthNames: [],
    timeNames: []
};


app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    helpers:{
        TimeFormat: val =>{
            return dateFormat(val,'HH:MM');
        },
        DateFormat: val =>{
            return dateFormat(val,'dddd, dd/mm/yyyy');
        },
        section: hbs_sections()
    }
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
app.use('/account', require('./controllers/admin/account.controller'))
app.use('/ThoiSu', ThoiSu);

app.listen(port);
console.log('http://localhost:' + port);

