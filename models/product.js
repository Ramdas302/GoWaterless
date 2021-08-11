var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({  
    productcategoryId:{type:String,ref:"product_category"},
    Product_Title:{type:String,required:true},
    Default_price:{type:Number,required:true},
    Discount:{type:Number,required:true},
    Product_Description:{type:String,required:true},
    Total_Price:{type:String},
    createdAt:{type:String,}
})

mongoose.model('product',ProductSchema);