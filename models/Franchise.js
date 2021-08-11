var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FranchiseSchema = new Schema({
    Franchise_Name:{type:String,required:true},
    Coupon_code:{type:String,required:true},
    Applicable_cities:{type:String,required:true},
    Discount:{type:String, required:true},
    Expiry_Date:{type:String, required:true},
    Franchise_Status:{type:String, default:"Inactive"},
    createdAt :{type:String},
    
})

mongoose.model('franchise',FranchiseSchema);