var express = require('express');
var exphbs  = require('express-handlebars');
var path=require('path');
var port=80;
 
var app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', '.hbs');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.use('/ThoiSu', require('./controllers/ThoiSu.controller'));
app.use('/ThoiSu/ThoiSuChiTiet', require('./controllers/ThoiSu.controller'));

app.listen(port);
console.log('http://localhost:' + port);

