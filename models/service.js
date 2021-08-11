var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ServiceSchema = new Schema({  
    Service:{type:String,required:true},
    Price:{type:String,required:true},
    City:{type:String,required:true},
   
})
mongoose.model('service',ServiceSchema);