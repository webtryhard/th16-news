var express = require('express');
var exphbs  = require('express-handlebars');
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
        }
    }
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

