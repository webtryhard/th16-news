var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var path=require('path');

var port = 80;

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.use(express.static('../../public'));
app.use('/ThoiSu', require('../controllers/ThoiSu.controller'));
//launch ======================================================================

app.listen(port, () => {
    console.log('web server is running at http://localhost:%d', port);
});
