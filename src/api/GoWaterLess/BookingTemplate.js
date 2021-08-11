const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var BookingSchema = require('../../../models/Booking');
var BookingModel = mongoose.model('booking');


router.post('/addBookingData',function(req,res){

    var localtime= Date().toString();
    var addBookingData = new BookingModel({
      UserName: req.body.UserName,
      userId: req.body.userId,
      Booking_Id: req.body.Booking_Id,
      Date: req.body.Date,
      Time: req.body.Time,
      Delivery_Location: req.body.Delivery_Location,
      VRN: req.body.VRN,
      createdAt:localtime
    });
    addBookingData.save(function (err, result) {
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

router.get('/getBookingData',function(req,res){
    BookingModel.find({}).exec(function(err,result){
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


router.get('/getBookingData/:userId',function(req,res){
    BookingModel.find({userId:req.params.userId}).exec(function(err,result){
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



router.get('/getBookingTotal',async(req,res)=>{
    try{
        var data = new Date();
        data.setDate(data.getDate()-7);

        monthData=new Date();
        monthData.setMonth(monthData.getMonth() - 1);
        console.log(monthData)
    const count = await BookingModel.count({"createdAt":{$gte:new Date(Date.now()- monthData)}})
    var userlastweek = await BookingModel.count({"createdAt":{$gte:new Date(Date.now() - data)}})
    perc =(100 * userlastweek) / count;
    var percentage = perc.toFixed(2)
    if(userlastweek){
        res.json({
            status: 200,
            Newuser: userlastweek,percentage
            
          });
        }
    }catch(ex){
        console.error(ex);
       }
  
  });


router.put('/updateBookingData/:id',function(req,res){
    update = {
      $set: {
        UserName: req.body.UserName,
        Booking_Id: req.body.Booking_Id,
        Date: req.body.Date,
        Time: req.body.Time,
        Delivery_Location: req.body.Delivery_Location,
        VRN:req.body.VRN,
       
      }
    };
    BookingModel.findByIdAndUpdate(req.params.id,update, function (err, booking) {
        if (err) {
          console.error("err"+err)
          return res.status(400).json({
            message: 'Bad Request'
          });
        } else {
          res.json({
            status: 200,
            data: booking
          })
        }
  
      });
  
  
  });
  

  router.post('/deleteBookingdata/:id',async(req,res)=>{
    var deletedata = await BookingModel.findByIdAndRemove(req.params.id)
    if (deletedata) {
      res.json({
        status:200,
        data:deletedata 
      })
    }else{
     console.error(err);
     return res.status(400).json({
       message: 'Bad Request'
    });
      
    }
  })
  module.exports=router;