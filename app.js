var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var dateFormat = require('dateformat');
var path=require('path');
var morgan = require('morgan');

var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

// app.use(require('./middlewares/locals.mdw'));

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
    partialsDir: 'views/pieces',
    helpers:{
        TimeFormat: val =>{
            return dateFormat(val,'HH:MM');
        },
        DateFormat: val =>{
            return dateFormat(val,'dddd, dd/mm/yyyy');
        },
        section: hbs_sections()
    },
    registerHelper: {
        if_eq: function(a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    }},
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

var ThoiSu=require('./controllers/list.controller');
app.use('/list', ThoiSu);

var Admin=require('./controllers/admin.controller');
app.use('/Admin', Admin);

var account=require('./controllers/admin/account.controller');
app.use('/account', account);

app.listen(port);
console.log('http://localhost:' + port);

