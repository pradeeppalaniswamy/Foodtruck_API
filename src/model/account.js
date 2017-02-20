import mongoose from 'mongoose';
const schema=mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
let Account =new schema(
  {
    email:String,
    password:String
    }


);
Account.plugin(passportLocalMongoose);
module.exports=mongoose.model('Account',Account);
