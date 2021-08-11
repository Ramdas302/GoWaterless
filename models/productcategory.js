var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductCategorySchema = new Schema({
    product_category:{type:String,required:true},  
})

mongoose.model('product_category',ProductCategorySchema);