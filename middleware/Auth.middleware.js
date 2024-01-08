// const MyPassword="LetMeIn";
const MyPassword = process.env.ROUTE_PASSWORD


// validation function
const verifyAuth =(req,res,next)=>{

    // console.log(req);
    const{authorization }=req.headers;

    //  console.log("authorization: ",req.headers.authorization);

     // Decode base64 string, because authorization header is base64-encoded,(confirmed after console.log=> authorization: 'Basic OkxldE1lSW4=' ) 
    //  and the decoded string will be in the format username:password
    const credentials = Buffer.from(authorization.split(' ')[1], 'base64').toString('utf-8');

    // Extract username and password
    const [username, password] = credentials.split(':');

    if(!password){
        return res.status(403).json("no password");
    }
    else if(MyPassword!==password){
        return res.status(403).json("password did'nt matched");
    }
    else {
        // Authentication successful, call next
        next();
    }

}

module.exports={verifyAuth};