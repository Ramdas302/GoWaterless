const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var ServiceSchema = require('../../../models/service');
var ServiceModel = mongoose.model('service');
var UserSchema = require('../../../models/Users');
var UserModel = mongoose.model('user');




router.post('/addServices/:id',async(req,res)=>{
  var services = await  UserModel.findById(req.params.id)
       
  const servicestatus = JSON.parse(JSON.stringify(services));
  console.log(servicestatus);
  var checkstatus= servicestatus.Permission_Pervileage.addService_Status;
  console.log(checkstatus)
  if(checkstatus=='Active'){
  
    var localtime= Date().toString();
    var Services = JSON.stringify(req.body.Service);
    var addServices = new ServiceModel({
        Service:req.body.Service,
        Price:req.body.Price,
        City:req.body.City
    });
  var result = await addServices.save() 
   
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

router.get('/getServices',function(req,res){
    ServiceModel.find({}).exec(function(err,result){
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

router.get('/cityServices/:City',function(req,res){
    ServiceModel.find({City:req.params.City}).exec(function(err,result){
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


router.put('/updateservicePrice/:userId/:id',async(req,res)=>{
  var price = await  UserModel.findById(req.params.userId)
    const pricestatus = JSON.parse(JSON.stringify(price));
    console.log(pricestatus);
    var checkstatus= pricestatus.Permission_Pervileage.updateServicePrice_Status;
    console.log(checkstatus)
    if(checkstatus=='Active'){
      update = {
        $set: {
          Service:req.body.Service,
          Price:req.body.Price,
          City:req.body.City
        }
      };
  var updatedata= await ServiceModel.findByIdAndUpdate( req.params.id,update) 
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
module.exports=router;