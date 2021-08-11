var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = new Schema({
    fullName:{type:String,required:true},
    Email_ID:{type: String,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Contact_No:{type:Number, required:true},
    Password :{type:String, required:true},
    role: {type:String, default:"user"},
    createdAt: {type:String},
    Last_Login: {type:String, default:""},
    Permission_Pervileage:{
        addDashboardCategory_Status : {type : String, default :''},
        updateDashboardCategory_Status : {type : String, default :''},
        deleteDashboardCategory_Status : {type : String, default :''}
    }
})
UserSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
UserSchema.index({fullName: 'text', Email_ID: 'text',createdAt:'text'});
UserSchema.index({'$**': 'text'});
mongoose.model('user',UserSchema);