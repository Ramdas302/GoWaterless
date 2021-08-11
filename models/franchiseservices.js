var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FranchiseServiceSchema = new Schema({  
    Service:{type:[String]},
    Price:{type:String,required:true},
    franchiseId:{type:String,required:true},
   
})
mongoose.model('franchiseservice',FranchiseServiceSchema);