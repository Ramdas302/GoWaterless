const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var PaymentSchema = require("../../../models/payment");
var PaymentModel = mongoose.model("payment");
var UserSchema = require('../../../models/Users');
var UserModel = mongoose.model('user');

router.get("/allpaymentData", function (req, res) {
  PaymentModel.find({}).exec(function (err, result) {
    if (err) {
      return res.status(400).json({
        message: "Bad Request",
      });
    } else {
      res.json({
        status: 200,
        data: result,
      });
    }
  });
});




router.put('/updatepaymentsatus/:userId/:id',async(req,res)=>{


    var payment = await  UserModel.findById(req.params.userId)
       
      const paymentstatus = JSON.parse(JSON.stringify(payment));
      console.log(paymentstatus);
      var checkstatus= paymentstatus.Permission_Pervileage.updatePayment_Status;
      console.log(checkstatus)
      if(checkstatus=='Active'){
        updatedata = {
            $set: {
              payment_status: req.body.payment_status,
            },
          };
  
    var updatedata= await PaymentModel.findByIdAndUpdate( req.params.id,updatedata)
       
    if (updatedata) {
      res.json({
        status:200,
        data:updatedata 
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

module.exports = router;
