var express = require('express');
var exphbs  = require('express-handlebars');
var path=require('path');
var port=3000;
 
var app = express();

app.use(express.static(path.join(__dirname, '/public')));
 
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
 
app.get('/', function (req, res) {
    res.render('home');
});
 

app.listen(port);
console.log('http://localhost:' + port);