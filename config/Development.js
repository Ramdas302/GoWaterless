var mongoose = require('mongoose');

url = 'mongodb://localhost:27017/GoWaterLess';

mongoose.connect(url).then(()=>{
console.log('mongodb connected')
}).catch((err)=>{
    console.log('mongodb not connected')
})
module.exports=mongoose;