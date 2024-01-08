const {data}=require("../DB/data.json");
const {verifyAuth}=require("../middleware/Auth.middleware");
// require('dotenv').config();


const getCurrencies=(req,res)=>{
     
    // password validation
    if(!verifyAuth(req)){
        res.status(403).json({
            message: "Unauthorized Request",
          })  
    }else{
        const min_value= req.query.min_value;
   
    //if min_value provided in parmas
    if(min_value){
        let final=data.filter((item)=>{
            if(item.min_size>=min_value){
                return item;
            }
        });
        // res.send(final); 
        res.json(final); 
    }
    else{
        res.json(data); //data is already in json format no need to convert
    }

    }

    
}

const getCurrenciesWithSymbol =(req,res)=>{
    const sym=req.params.symbol;
    // console.log(sym);

    for(let i=0;i<data.length;i++){
        if(data[i].id===sym){
            res.status(200).send(data[i]);
        }
    } 
    res.status(404).send("symbol not found");
}
module.exports= {getCurrencies, getCurrenciesWithSymbol} ;