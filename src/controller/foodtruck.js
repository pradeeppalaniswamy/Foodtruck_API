import mongoose from 'mongoose';
import {Router} from 'express';
import Review from '../model/review';
import FoodTruck from '../model/foodtruck';
import {generateAccessToken,respond,authenticate} from '../middleware/authmiddleware';

export default({config,db})=>{

let api=Router();
api.post('/add',(req,res)=>{
let newfoodtruck=new FoodTruck();
newfoodtruck.name=req.body.name;
newfoodtruck.foodtype=req.body.foodtype;
newfoodtruck.avgcost=req.body.avgcost;
newfoodtruck.geomenty.Coordinates=req.body.Coordinates;

newfoodtruck.save(err=>{if(err){res.send(err);}
res.json({message:'successful'});
});

});


api.get('/',authenticate,(req,res)=>
{
FoodTruck.find({},(err,foodtrucks)=>{
  if(err)
  {res.send(err);}
  res.json(foodtrucks);

});


});
api.get('/:id',(req,res)=>
{
FoodTruck.findById(req.params.id,(err,foodtrucks)=>{
  if(err)
  {res.send(err);}
  res.json(foodtrucks);

});


});


api.put('/:id',(req,res)=>{
FoodTruck.findById(req.params.id,(err,foodtruck)=>
{
if(err)
{
  res.send(err);
}

  foodtruck.name=req.body.name;
  foodtruck.save(err=>{
if(err)
{
  res.send(err);
}
    res.json({message:"updated "});
  });
});

});

api.delete('/:id',(req,res)=>{
  FoodTruck.remove({_id:req.params.id},(err,rest)=>
{
  if(err){
    res.send(err);}
  res.json({message:"delete"});
});
});
api.post('/review/add/:id',(req,res)=>{
FoodTruck.findById(req.params.id,
  (err,foodtrucks)=>{

  if(err){res.send(err);
  }

  let newrev=new Review();
  newrev.title=req.body.title;
  newrev.text=req.body.text;
  newrev.foodtruck=foodtrucks._id;
  newrev.save((err,review)=>{if(err)
  {
res.send(err);

  }});
  foodtrucks.reviews.push(newrev);
  foodtrucks.save((err,fodtruck)=>{if(err){

    res.send(err);
  }
res.json({message:'review saved'});
});
});


});

api.get('/review/:id',(req,res)=>{

Review.find({foodtruck:req.params.id},(err,review)=>{
if(err){res.send(err);}
  res.json(review);
});

});


return api;

}
