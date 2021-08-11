const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var OrderSchema = require('../../../models/order');
var OrderModel = mongoose.model('order');
var BookingSchema = require('../../../models/Booking');
var BookingModel = mongoose.model('booking');
var CouponSchema = require('../../../models/coupon');
var CouponModel = mongoose.model('coupon');
var FranchiseSchema = require('../../../models/Franchise');
var FranchiseModel = mongoose.model('franchise');
var UserSchema = require('../../../models/Users');
var UserModel = mongoose.model('user');



router.post('/addOrderData/:id',async(req,res)=>{
var orders = await  UserModel.findById(req.params.id)
     
const orderstatus = JSON.parse(JSON.stringify(orders));
console.log(orderstatus);
var checkstatus= orderstatus.Permission_Pervileage.addOrders_Status;
console.log(checkstatus)
if(checkstatus=='Active'){
  var localtime= Date().toString();
var addorderData = new OrderModel({
      bookingId: req.body.bookingId,
      contact_No: req.body.contact_No,
      Email: req.body.Email,
      franchiseId: req.body.franchiseId,
      Payment_Mode: req.body.Payment_Mode,
      createdAt:localtime
});

var result = await addorderData.save() 
 
  if (result) {
    res.json({
      status:200,
      data:result 
    })
  }else{
   console.error(err);
   return res.status(400).json({
     message: 'Bad Request'
  });
    
  }
}else{
res.json({
  status:200,
  message:"not allowed permission"
});
}
})



router.get('/getOrderData',function(req,res){
    OrderModel.find({}).exec(function(err,result){
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


router.get("/getTrackingData", async (req, res) => {
    var view_data = [];
    OrderModel.find({}).populate("bookingId", ["Date","Delivery_Location"]).exec(function (err, track) {
        if (err) {
          console.error(err);
        } else if (track != "" || track != undefined || track != null) {
            track.forEach(function (trackings) {
            view_data.push({
              userName:trackings.userName,
              BookingId:trackings.Booking_Id,
              Date:trackings.bookingId.Date,
              washerName:trackings.washerName,
              Delivery_Location:trackings.bookingId.Delivery_Location,
            
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


router.post('/addCoupon/:id',async(req,res)=>{
  var coupons = await  UserModel.findById(req.params.id)
       
  const couponstatus = JSON.parse(JSON.stringify(coupons));
  console.log(couponstatus);
  var checkstatus= couponstatus.Permission_Pervileage.addCoupon_Status;
  console.log(checkstatus)
  if(checkstatus=='Active'){
  
    var localtime= Date().toString();
    var addCouponData = new CouponModel({
        franchiseId:req.body.franchiseId,
        franchiseName:req.body.franchiseName,
        Coupon_code: req.body.Coupon_code,
        Applicable_cities: req.body.Applicable_cities,
        Discount: req.body.Discount,
        Expiry_Date: req.body.Expiry_Date,
        createdAt:localtime
    });
  var result = await addCouponData.save() 
   
    if (result) {
      res.json({
        status:200,
        data:result 
      })
    }else{
     console.error(err);
     return res.status(400).json({
       message: 'Bad Request'
    });
      
    }
  }else{
  res.json({
    status:200,
    message:"not allowed permission"
  });
  }
  })
  
router.get('/getCouponFrachiseData',async(req,res)=>{
    var view_data = [];
   var CouponData = await  CouponModel.find({})
   var FranchiseData = await  FranchiseModel.find({})  
     if (CouponData != "" || CouponData != undefined ) {
        CouponData.forEach(function (Coupons) {
            view_data.push({
                Coupons
            });
          });
     if (FranchiseData != "" || FranchiseData != undefined ) {
        FranchiseData.forEach(function (Franchises) {
            view_data.push({
                Franchises
            });
          });
    
          res.json({
            status: 200,
            data: view_data,
          });
        }} else {
          res.json({
            status: 400,
          });
        } 
});

router.put('/updatestatusCouponFranData/:id',async(req,res)=>{

    var data=req.params.id;
      var franchisedataupdate = await FranchiseModel.findById(req.params.id);

      const franchjson = JSON.stringify(franchisedataupdate);
      const francgobj = JSON.parse(franchjson);

     var checkfranch= francgobj["_id"]; 

      if(data==checkfranch){
    
    update = {
      $set: {
        Franchise_Status: req.body.Franchise_Status,
      
      }
    };
   var  franchisedata = await FranchiseModel.findByIdAndUpdate(req.params.id,update)
        if (franchisedata) {
            res.json({
                status: 200,
                data: franchisedata
              })
        } else {
          console.log()
        }
    }
    var coupondata=req.params.id;
      var coupondataupdate = await CouponModel.findById(req.params.id);

      const couponjson = JSON.stringify(coupondataupdate);
      console.log(couponjson)
      const couponobj = JSON.parse(couponjson);

     var checkcoupon= couponobj["_id"]; 
     if(coupondata==checkcoupon){
    
        update = {
          $set: {
            Franchise_Status: req.body.Franchise_Status,
          
          }
        };
       var  coupondata = await CouponModel.findByIdAndUpdate(req.params.id,update)
            if (coupondata) {
                res.json({
                    status: 200,
                    data: coupondata
                  })
            } else {
              console.log()
            }
        }
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
module.exports=router;