const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var FranchiseSchema = require('../../../../models/Franchise');
var FranchiseModel = mongoose.model('franchise');
var WasherOrderSchema = require('../../../../models/washerorder');
var WasherOrderModel = mongoose.model('washerorder');
var OrderSchema = require('../../../../models/order');
var OrderModel = mongoose.model('order');
var WasherSchema = require('../../../../models/washer');
var WasherModel = mongoose.model('washer');
var FranchiseServiceSchema = require('../../../../models/franchiseservices');
var FranchiseServicerModel = mongoose.model('franchiseservice');
var SubmitServiceSchema = require('../../../../models/submitservice');
var SubmitServiceModel = mongoose.model('submitservice');


router.get("/getfranchiseorder", async (req, res) => {
  var view_data = [];
  WasherOrderModel.find({userId:req.body.userId}).populate("orderId", ["franchiseId","bookingId"]).populate("washerId", ["Washer_Name"]).exec(function (err, washerorder) {
      if (err) {
        console.error(err);
      } else if (washerorder != "" || washerorder != undefined || washerorder != null) {
        washerorder.forEach(function (washerorders) {
          view_data.push({
            bookingId:washerorders.orderId.bookingId,
            FranchiseId:washerorders.orderId.franchiseId,
            washerId:washerorders.washerId._id,
            Washer_Name:washerorders.washerId.Washer_Name,
          
          });
        });
        res.json({
          status: 200,
          data: view_data,
        });
      } else {
        res.json({
          status: 400,
        });
      }
    });
}); 


router.get("/getwasherorders", async (req, res) => {
  var view_data = [];
  WasherOrderModel.find({washerId:req.body.washerId}).populate("washerId", ["franchiseId","Washer_Name"]).exec(function (err, washerorder) {
      if (err) {
        console.error(err);
      } else if (washerorder != "" || washerorder != undefined || washerorder != null) {
        washerorder.forEach(function (washerorders) {
          view_data.push({
            orderId:washerorders.orderId,
            washerId:washerorders.washerId._id,
            franchiseId:washerorders.washerId.franchiseId,
            Washer_Name:washerorders.washerId.Washer_Name,
          
          });
        });
        res.json({
          status: 200,
          data: view_data,
        });
      } else {
        res.json({
          status: 400,
        });
      }
    });
}); 


router.get('/franchisetotalwashers',function(req,res){
  WasherModel.find({franchiseId:req.body.franchiseId}).exec(function(err,result){
    if(err){
      return res.status(400).json({
        message: 'Bad Request'
      });
    }else{
      res.json({
        status: 200,
        data: result
      });
    }
  
  });
});

router.post('/addorderwasher',function(req,res){
    var addorderwasher = new WasherOrderModel({
      orderId: req.body.orderId,
      washerId: req.body.washerId,
      userId:req.body.userId
    });
    addorderwasher.save(function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: result
        })
      }

    });

});

router.get('/washers',function(req,res){
  WasherModel.find({}).exec(function(err,result){
    if(err){
      return res.status(400).json({
        message: 'Bad Request'
      });
    }else{
      res.json({
        status: 200,
        data: result
      });
    }
  
  });
});

router.post('/submitservices',function(req,res){
  var addfranserpri= new SubmitServiceModel({
    serviceId: req.body.serviceId,
    franchiseId: req.body.franchiseId,
  });
  addfranserpri.save(function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    } else {
      res.json({
        status: 200,
        data: result
      })
    }

  });

});

router.post('/addfranchiseservice',function(req,res){
  var addfranchiseservice= new FranchiseServicerModel({
    Service:req.body.Service,
    Price:req.body.Price,
    franchiseId:req.body.franchiseId
  });
  addfranchiseservice.save(function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    } else {
      res.json({
        status: 200,
        data: result
      })
    }

  });

});


router.get("/submitfranchiseservice", async (req, res) => {
  var view_data = [];
  SubmitServiceModel.find({franchiseId:req.body.franchiseId}).populate("serviceId", ["Service","Price"]).populate("franchiseId", ["Franchise_Name"]).exec(function (err, washerorder) {
      if (err) {
        console.error(err);
      } else if (washerorder != "" || washerorder != undefined || washerorder != null) {
        washerorder.forEach(function (washerorders) {
          view_data.push({
            _id:washerorders._id,
            serviceId:washerorders.serviceId._id,
            Service:washerorders.serviceId.Service,
            Price:washerorders.serviceId.Price,
            franchiseId:washerorders.franchiseId._id,
            Franchise_Name:washerorders.franchiseId.Franchise_Name,
          
          });
        });
        res.json({
          status: 200,
          data: view_data,
        });
      } else {
        res.json({
          status: 400,
        });
      }
    });
}); 

module.exports=router;