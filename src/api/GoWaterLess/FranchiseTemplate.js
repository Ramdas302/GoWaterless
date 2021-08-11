const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var FranchiseSchema = require('../../../models/Franchise');
var FranchiseModel = mongoose.model('franchise');
var WasherSchema = require('../../../models/washer');
var WasherModel = mongoose.model('washer');

router.post('/addFranchiseData',function(req,res){
    var localtime= Date().toString();
    var addFranchiseData = new FranchiseModel({
      Franchise_Name:req.body.Franchise_Name,
      Coupon_code: req.body.Coupon_code,
      Applicable_cities: req.body.Applicable_cities,
      Discount: req.body.Discount,
      Expiry_Date: req.body.Expiry_Date,
      createdAt:localtime
    });
    addFranchiseData.save(function (err, result) {
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

router.get('/getFranchiseData',function(req,res){
    FranchiseModel.find({}).exec(function(err,result){
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



router.post('/addWasherdata',function(req,res){
    var localtime= Date().toString();
    var addWasherdata = new WasherModel({
        franchiseId: req.body.franchiseId,
        Washer_Name: req.body.Washer_Name,
        createdAt:localtime
    });
    addWasherdata.save(function (err, result) {
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

router.get('/getWasherData',function(req,res){
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

module.exports=router;