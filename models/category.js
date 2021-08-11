var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
    Car_Company:{type:String,required:true},
    Car_Model:{type:String,required:true},
    Car_Type:{type:String, required:true},

})
CategorySchema.index({Car_Company: 'text', Car_Model: 'text',Car_Type:'text'});
CategorySchema.index({'$**': 'text'});

mongoose.model('category',CategorySchema);