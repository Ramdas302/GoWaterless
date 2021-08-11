var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookingSchema = new Schema({
    UserName:{type:String,required:true, ref:"user"},
    userId:{type:String,required:true, ref:"user"},
    Booking_Id:{type:String, required:true},
    Date :{type:String, required:true},
    Time:{type:String, required:true},
    Delivery_Location:{type:String, required:true},
    VRN:{type:String, required:true},
    createdAt:{type:String, required:true},
    
})

mongoose.model('booking',BookingSchema);