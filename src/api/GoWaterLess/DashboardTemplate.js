const { query } = require('express');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var CategorySchema = require('../../../models/category');
var CategoryModel = mongoose.model('category');
var UserSchema = require('../../../models/Users');
var UserModel = mongoose.model('user');

router.post('/addCategorydata/:id',async(req,res)=>{
  
   var category = await  UserModel.findById(req.params.id)
     
        const categorystatus = JSON.parse(JSON.stringify(category));
        console.log(categorystatus);
        var checkstatus= categorystatus.Permission_Pervileage.addDashboardCategory_Status;
        console.log(checkstatus)
      if(checkstatus=='Active'){
        
        var categoryData = new CategoryModel({
          Car_Company:req.body.Car_Company,
          Car_Model:req.body.Car_Model,
          Car_Type:req.body.Car_Type
        });
        
       var result = await categoryData.save() 
         
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




router.get('/getBookingData',function(req,res){
    CategoryModel.find({}).exec(function(err,result){
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


router.get("/searchCategory/:query", async (req, res) => {
  try {
    const categorys = await CategoryModel.find({$text: {$search: req.params.query}})
    if(categorys){
      
      res.json({
        categorys,
          
      })
  }
  } catch (error) {
    console.log(error);
   
  }
});


router.put('/updateCategory/:userId/:id',async(req,res)=>{


  var category = await  UserModel.findById(req.params.userId)
     
    const categorystatus = JSON.parse(JSON.stringify(category));
    console.log(categorystatus);
    var checkstatus= categorystatus.Permission_Pervileage.updateDashboardCategory_Status;
    console.log(checkstatus)
    if(checkstatus=='Active'){
   updatedata={
  $set:{
    Car_Company:req.body.Car_Company,
    Car_Model:req.body.Car_Model,
    Car_Type:req.body.Car_Type
   }
 }

  var updatedata= await CategoryModel.findByIdAndUpdate( req.params.id,updatedata)
     
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

router.post('/deletecategory/:userId/:id',async(req,res)=>{
  var category = await  UserModel.findById(req.params.userId)
  const categorystatus = JSON.parse(JSON.stringify(category));
  console.log(categorystatus);
  var checkstatus= categorystatus.Permission_Pervileage.deleteDashboardCategory_Status;
  console.log(checkstatus)
  if(checkstatus=='Active'){
  var deletedata = await CategoryModel.findByIdAndRemove(req.params.id)
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
}else{
res.json({
  status:200,
  message:"not allowed permission"
});
}
})

  router.put('/changecategorystatus',function(req,res){
  update={
     _id:req.body._id
  }
 updatedata={
  $set:{
  'Permission_Pervileage.addDashboardCategory_Status': req.body.addDashboardCategory_Status,
  'Permission_Pervileage.updateDashboardCategory_Status': req.body.updateDashboardCategory_Status,
  'Permission_Pervileage.deleteDashboardCategory_Status': req.body.deleteDashboardCategory_Status
   }
 }

   UserModel.findByIdAndUpdate( update,updatedata).exec(function(err,result){
     if(err){
       console.log(err)
     }else{
       res.json({
         status:200,
         data:result
       })
     }
   })
  })     
  

  
  module.exports=router;