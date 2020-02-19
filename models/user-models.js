const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const userSchema=new Schema({
    username:{type:String},
    googleid:{type:String},
    email:{type:String},
    img:{type:String}
})
const User=mongoose.model('User',userSchema);
module.exports=User;