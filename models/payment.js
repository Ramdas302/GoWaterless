var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaymentSchema = new Schema({
    UserName:{type:String,required:true, ref:"user"},
    userId:{type:String,required:true, ref:"user"},
    Booking_Id:{type:String, required:true, ref:"booking"},
    Date :{type:String, required:true},
    paid_using:{type:String, required:true},
    Delivery_Location:{type:String, required:true},
    GoWaterless_Coins:{type:Number, required:true},
    sale_status:{type:Number, default:""},
    
})

mongoose.model('payment',PaymentSchema);