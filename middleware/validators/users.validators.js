// validator is used to keys if query string/parameters are in proper formate
const Joi=require('joi');

const schema=Joi.object().keys({
    age:Joi.number().integer().min(0).max(100),
    gender:Joi.string().valid("male","female"),
});

//convert this getQueryErrors function into validateSearchQuery middleware function
// let getQueryErrors=(data)=>{
//     let result=schema.validate(data);
//     return result.error;
// }


//directly use in index.js , if validation failed then return res directly from here
const validateSearchQuery=(req,res,next)=>{
    //since we are not recieving any thing from 
   const {gender, age}=req.query;
   const { error }=schema.validate({ gender, age });
    if(error){
        return res.status(422).json(error);
    }
    else {
        next(); // Call next only when there is no error
      }
}


module.exports={validateSearchQuery};