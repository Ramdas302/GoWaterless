const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var ProductCategorySchema = require('../../../models/productcategory');
var ProductCategoryModel = mongoose.model('product_category');
var ProductSchema = require('../../../models/product');
var ProductModel = mongoose.model('product');

router.post('/addProductCategory',function(req,res){
    var localtime= Date().toString();
    var addProductCategory = new ProductCategoryModel({
        product_category:req.body.product_category,
    });
    addProductCategory.save(function (err, result) {
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

router.get('/getproductcategory',function(req,res){
  ProductCategoryModel.find({}).exec(function(err,result){
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



router.post('/addProduct',function(req,res){
  var localtime= Date().toString();

  var data={
    Default_price:req.body.Default_price,
    Discount:req.body.Discount
   
  }
  totalamount=data.Default_price - (data.Default_price * data.Discount/100 );
  var addProductCategory = new ProductModel({
      productcategoryId:req.body.productcategoryId,
      Product_Title:req.body.Product_Title,
      Default_price:req.body.Default_price,
      Discount:req.body.Discount,
      Product_Description:req.body.Product_Description,
      Total_Price:totalamount,
      createdAt :localtime
  });
  addProductCategory.save(function (err, result) {
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


module.exports=router;