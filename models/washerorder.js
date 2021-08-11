var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WasherOrderSchema = new Schema({
    orderId:{type:String,required:true, ref:"order"},
    washerId:{type:String,required:true, ref:"washer"},
    userId:{type:String,required:true, ref:"user"},    
})

mongoose.model('washerorder',WasherOrderSchema);