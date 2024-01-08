const {data}= require("../DB/users.json");
const {getQueryErrors}=require("../middleware/validators/users.validators");

const getAllUsers=(req,res)=>{
    res.send(data);
}

const SearchByUuid=(req,res)=>{
    const uuid=req.params.uuid;
    // console.log("uuid check");
    // console.log(uuid);

    for(let i=0;i<data.length;i++){
        if(data[i].login.uuid===uuid){
            res.status(200);
            res.send(data[i]);
        }
    }
    res.status(404);
    res.send("not a found");
    
}

const searchByQuery=(req,res)=>{
    // console.log("req.query: ",req.query);
   

    //use Joi here to validate, here getQueryErrors() will return error when validation fails
    //**in place of getQueryErrors we will be using a validator middleware validateSearchQuery
    
    //-----prev code with getQueryErrors fucntion------
     const gender=req.query.gender;
    const age=req.query.age;
    // let error=getQueryErrors({age,gender});
    // if(error){
    //     res.status(442).json(error);
    // }
    // else{ do calculation}
    
        let myRes=data.filter((item)=>{
            //if retunred true for any obj than that obj will be stored in myRes, if false then not
            return (item.gender===gender && item.dob.age>=age)
        });
        res.send(myRes);
}


module.exports={getAllUsers,SearchByUuid,searchByQuery};

//---------------------------------------manually writting the  validation tests without Joi-------------------------------------------------- 
/* 
// if we have recieved gender and age both
    if(gen && age){
        let myRes=data.filter((item)=>{
            //if retunred true for any obj than that obj will be stored in myRes, if false then not
            return (item.gender===gen && item.dob.age>=age)
        });
        res.send(myRes);
    }

    //when only gender
    else if(gen){
        if(!["male","female"].includes(gen)){
            res.status(442).json({
                message:"Gender to search can either be 'male' or 'female'",
            })
        }
        let myRes=data.filter((item)=>{
        return (item.gender===gen)
        });
        res.send(myRes);
    }

    //when only age
    else if(age){
        if(!Number(age)){
            res.status(442).json({
                message: "Missing Search Parameters, search using age and/or gender",
              });
        }
        else if(age<0 || age>100){
            res.status(442).json({
                message: "Age out of bounds. It should be a number between 0 and 100",
              });
        }
        else{
            let myRes=data.filter((item)=>{
                return (item.dob.age>=age)
                });
                res.send(myRes);
             }
        
    }

    //when nothing , neither gender nor age
    else{
        res.status(442).json({
            message: "Missing Search Parameters, search using age and/or gender",
          });
    
    // if you want to send data in simple string formate then:
    // res.send("Missing Search Parameters, search using age and/or gender");
        }   
*/        

