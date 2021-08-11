var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubmitServiceSchema = new Schema({
    serviceId:{type:String, required:true, ref:"service"},
    franchiseId:{type:String,required:true, ref:"franchise"},
    createdAt :{type:String},
    
})

mongoose.model('submitservice',SubmitServiceSchema);