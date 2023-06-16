const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
//ObjectId la kieu du~ lieu
const productSchema=new Schema({
    id:{type: ObjectId},
    name:{type:String},
    detail:{type: String},
    emailContact:{type:String},
    phoneNumber:{type:Number},
    image:{type:String},
    category:{type:ObjectId,ref:'category'},// khoa ngoai
    
});

module.exports=mongoose.models.product || mongoose.model('product',productSchema);
// category ---> tren mongo la categories