var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WasherSchema = new Schema({
    franchiseId:{type:String,required:true, ref:"franchise"},
    userId:{type:String, required:true, ref:"user"},
    Washer_Name:{type:String, required:true},
    createdAt :{type:String},
    
})

mongoose.model('washer',WasherSchema);