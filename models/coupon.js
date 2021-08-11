var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CouponSchema = new Schema({
    Coupon_code:{type:String,required:true},
    franchiseId:{type:String,ref:"franchise"},
    franchiseName:{type:String,ref:"franchise"},
    Applicable_cities:{type:String,required:true},
    Discount:{type:Number, required:true},
    Expiry_Date:{type:String, required:true},
    Franchise_Status:{type:String, default:"Inactive"},
    createdAt :{type:String},
    
})

mongoose.model('coupon',CouponSchema);