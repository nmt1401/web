const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
//ObjectId la kieu du~ lieu
const userSchema=new Schema({
    id:{type: ObjectId},
    name:{type:String},
    email:{type:String},
    password:{type:String},
    //phân quyền
    role:{type:Number, default:1},
    //1: user , 100: admin,1000:system
});

module.exports=mongoose.models.user || mongoose.model('user',userSchema);
// category ---> tren mongo la categories