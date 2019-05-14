var express = require('express');

var app = express();

var path=require('path');

var port = 3000;

//launch ======================================================================

app.use(express.static('public'));
app.use(express.static('app/views'));

app.listen(port);
console.log('The magic happens on port ' + port);