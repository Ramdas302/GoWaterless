var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    bookingId:{type:String,required:true, ref:"booking"},
    contact_No:{type:String,required:true},
    Email:{type:String, required:true},
    franchiseId:{type:String, required:true, ref:"franchise"},
    Payment_Mode:{type:String, required:true},
    createdAt :{type:String},
    
})

mongoose.model('order',OrderSchema);