import mongoose from 'mongoose';
import Review from './review';
let Schema=mongoose.Schema;
let foodtruckSchema=new Schema({
  name:{type:String,req:true},
  foodtype:{type:String,req:true},
  avgcost:Number,
  geomenty:{
    type:{type:String,default:'Point'},
    Coordinates:[Number]
  },

  reviews: [{
  type:Schema.Types.ObjectId,
  ref:'Review'
  }]


});
module.exports=mongoose.model('FoodTruck',foodtruckSchema);
