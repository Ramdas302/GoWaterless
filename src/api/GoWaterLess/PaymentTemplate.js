const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var PaymentSchema = require('../../../models/payment');
var PaymentModel = mongoose.model('payment');


router.post('/addPaymentData',function(req,res){
    var localtime= Date().toString();
    var addPaymentData = new PaymentModel({
      UserName: req.body.UserName,
      userId: req.body.userId,
      Booking_Id: req.body.Booking_Id,
      Date: req.body.Date,
      paid_using: req.body.paid_using,
      Delivery_Location: req.body.Delivery_Location,
      GoWaterless_Coins:req.body.GoWaterless_Coins,
      payment_status:req.body.payment_status,
      createdAt:localtime,
    });
    addPaymentData.save(function (err, result) {
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

router.get('/getPaymentData',function(req,res){
  PaymentModel.find({}).exec(function(err,result){
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



router.get('/totalsalelastweek',async(req,res)=>{
    try{
        var data = new Date();
        data.setDate(data.getDate()-7);

        monthData=new Date();
        monthData.setMonth(monthData.getMonth() - 1);
        console.log(monthData)
    const count = await PaymentModel.count({"createdAt":{$gte:new Date(Date.now()- monthData)}})
    var userlastweek = await PaymentModel.count({"createdAt":{$gte:new Date(Date.now() - data)}})
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

module.exports=router;