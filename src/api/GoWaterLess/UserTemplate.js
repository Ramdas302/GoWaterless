const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const moment = require('moment');

const { check, validationResult } = require('express-validator');
var UserSchema = require('../../../models/Users');
var UserModel = mongoose.model('user');

router.post("/register-user",
    [
        check('Email_ID', 'Email is required')
            .not()
            .isEmpty(),
        check('Password', 'Password should be between 5  characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5})
    ],
    (req, res) => {

        var localtime= Date().toString();
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        else {
            bcrypt.hash(req.body.Password, 10).then((hash) => {
                const user = new UserModel({
                    fullName:req.body.fullName,
                    Email_ID: req.body.Email_ID,
                    Contact_No: req.body.Contact_No,
                    Password: hash,
                    createdAt:localtime
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }
    });


  
    router.get('/getusers',function(req,res){
        UserModel.find({}).exec(function(err,result){
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

router.get('/getUserlastweek',async(req,res)=>{
    try{
        var data = new Date();
        data.setDate(data.getDate()-7);

        monthData=new Date();
        monthData.setMonth(monthData.getMonth() - 1);
        console.log(monthData)
    const count = await UserModel.count({"createdAt":{$gte:new Date(Date.now()- monthData)}})
    var userlastweek = await UserModel.count({"createdAt":{$gte:new Date(Date.now() - data)}})
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

    //     try{
    //     const count = await UserModel.count({createdAt:{'$lte':new Date(),'$gte':new Date(Date()-7)}})
    // var user = await UserModel.find({createdAt:{'$lte':new Date(),'$gte':new Date(Date()-7)}})
    //     if(user){
    //         res.json({
    //             status: 200,
    //             data: user,count
                
    //           });
    //         }
    //     }catch(ex){
    //         console.error(ex);
    //        }
      
    //   });
    
    
    
    

router.post("/login", async(req, res) => {

 console.log(req.body)
    
    let getUser;
    UserModel.findOne({
        Email_ID: req.body.Email_ID,role:req.body.role,
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.Password, user.Password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            Email_ID: getUser.Email_ID,
            userid: getUser._id,
            role:getUser.role
        }, "authorize", {
            expiresIn: "1h"
        });

        var localtime= Date().toString();
        var query={
            Email_ID:req.body.Email_ID
        }
        update = {
            $set: {
                Last_Login:localtime
             
            }
          };
          UserModel.updateOne(query,update, function (err, update) {
              if (err) {
                console.error("err"+err)
              
              } else {
               console.log(update)
              }
        
            });
         
    res.status(200).json({
        user:{
        _id: getUser._id,
        role:getUser.role,
        fullName:getUser.fullName,
        Email_ID:getUser.Email_ID
        },
        token: jwtToken,
    });
   
    }).catch(err => {
        return res.status(400).json({
            message: "Authentication failed"
        });
    });
});


router.get('/getloginlastweek',async(req,res)=>{
    // {"Last_Login":{$gte:new Date(Date.now() - 24*60*60 * 1000)}}
    try{
        var data = new Date();
        data.setDate(data.getDate()-7);

        monthData=new Date();
        monthData.setMonth(monthData.getMonth() - 1);
        console.log(monthData)
    const count = await UserModel.count({"Last_Login":{$gte:new Date(Date.now()- monthData)}})
    var userlastweek = await UserModel.count({"Last_Login":{$gte:new Date(Date.now() - data)}})
    perc =(100 * userlastweek) / count;
    var percentage = perc.toFixed(2)
    if(userlastweek){
        res.json({
            status: 200,
            TotalLogin: userlastweek,percentage
            
          });
        }
    }catch(ex){
        console.error(ex);
       }
  
  });


  router.get("/search/:query", async (req, res) => {
    try {
      const products = await UserModel.find({$text: {$search: req.params.query}})
      if(products){
        
        res.json({
            products,
            
        })
    }
    } catch (error) {
      console.log(error);
     
    }
  });


  router.get('/allusers',function(req,res){
    UserModel.find({}).sort([['createdAt', -1]]).exec(function(err,logindetails){

        const logindetailsdata = JSON.parse(JSON.stringify(logindetails));
        console.log(logindetailsdata);

        // var data = {
        //   createdAt: req.body.createdAt,
        // };
        // var result = logindetailsdata.filter( 
        //   (logindetailsdata) =>
        //     data.createdAt.includes(logindetailsdata.createdAt)
        // );
        // console.log(result);
        var roundtotal8 = logindetailsdata.filter(function (value) {
            return value.createdAt == "May  2021" 
          })
          console.log(roundtotal8);
  
        //   const uniquecolor8 = [...new Set(result.map((item) => item.color))];
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
