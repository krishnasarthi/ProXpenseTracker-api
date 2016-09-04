'use strict';

var express = require('express');
var path = require('path');
var mongoose = require('./db.js');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

//app.use(express.static(path.join(__dirname,'./public/app')));

var category = require('./route/category.js')(app);
var subcategory = require('./route/subcategory.js')(app);
var paymenttype = require('./route/paymenttype.js')(app);
var paymenttype = require('./route/payment.js')(app);

// app.get('*',function(req,res) {
// 	res.sendFile(path.join(__dirname,'./public/app/index.html'));
// }); 

var server = app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000');
});