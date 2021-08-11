var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('./config/development');
var UserTemplate = require('./src/api/GoWaterLess/UserTemplate');
var BookingTemplate = require('./src/api/GoWaterLess/BookingTemplate');
var DashboardTemplate = require('./src/api/GoWaterLess/DashboardTemplate');
var FranchiseTemplate = require('./src/api/GoWaterLess/FranchiseTemplate');
var OrderTemplate = require('./src/api/GoWaterLess/OrderTemplate');
var ProductCategoryTemplate = require('./src/api/GoWaterLess/ProductCategoryTemplate');
var ServicesTemplate = require('./src/api/GoWaterLess/ManagePriceSerTemplate');
var FranchiseTemp = require('./src/api/GoWaterLess/FranchiseAdmin/FranchiseTemp');
// var notification = require('./src/api/GoWaterLess/notification');
var app = express();
app.use(bodyParser.json());
app.use('/api',UserTemplate);
app.use('/api',BookingTemplate);
app.use('/api',DashboardTemplate);
app.use('/api',FranchiseTemplate);
app.use('/api',OrderTemplate);
app.use('/api',ProductCategoryTemplate);
app.use('/api',ServicesTemplate);
app.use('/api',FranchiseTemp);
// app.use('/api',notification);
app.listen(8000, () =>{
    console.log('server started at port 8000')
})
