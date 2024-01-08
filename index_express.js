const express=require('express');
require('dotenv').config();
const mongoose=require("mongoose");

// the localhost URI is used when establishing a connection to the MongoDB server using Mongoose in an Express application. 
// When you use Mongoose to connect to MongoDB, you typically pass the URI as an argument to the mongoose.connect() method. 
// 127.0.0.1:27017, IP address of the MongoDB server. 
// In this case, it's the loopback address, which means the MongoDB server is running on the same machine (localhost).
const DB_URI = "mongodb://127.0.0.1:27017";
mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((e) => console.log("Failed to connect to DB", e));

//To import controllers we used object destructing here, you can use simple objs also here
// const {getCurrencies, getCurrenciesWithSymbol} =require("./controllers/currencies.controller");
// const {getAllUsers,SearchByUuid,searchByQuery}= require("./controllers/users.controller");

// imported currency,blogs,userRouter routers from routes folder
const currencyRoutes =require("./routes/currencies.routes")
const blogsRoutes =require("./routes/blogs.routes");
const userRoutes= require("./routes/users.routes");

const port=8082;

//imported middleware for authentication,validation
const {verifyAuth}=require("./middleware/Auth.middleware");
const {validateSearchQuery}= require("./middleware/validators/users.validators");


//we only make a single server using this express()
const app=express();
app.use(express.json());

//------- using auth,validation middleware here everytime this middlewares will run for any routes, we have used next in them for chaining--------
// app.use(validateSearchQuery);
// app.use(verifyAuth);

/*-------------------------------------------------------blogs routes-------------------------------------------- */
app.use("/blogs",blogsRoutes);

/*--------------------------------------------------------currency routes-------------------------------------  */

//we are telling out app, which is basically our express server created using express(), that please use this router when you recieve anything on this route.
app.use("/currencies",currencyRoutes);


/*--------------------------------------------------------users routes-------------------------------------  */

//routes related to users, we ares using them without router for now
// app.get("/users",getAllUsers);

// We can selectively apply chain of middlewares to specific routes by adding it before the controller of that specific route validateSearchQuery
// app.get("/users/search",validateSearchQuery,verifyAuth, searchByQuery);

//order of get requests matters a lot, like we place "/users/:uuid" before "/users/search" then "/users/:uuid" will get matched first
// app.get("/users/:uuid",SearchByUuid);

//now we are using the userRoutes+ chain of middlewares when a request is recieved on /user route, and further query eg: /search, /:uuid etc will be checked by router in userRoutes
app.use("/users",validateSearchQuery,verifyAuth,userRoutes);




// --------------------------------------------------------------------------------------------------------------*/

app.listen(port,()=>{
  console.log("express server is listening on the port: "+port);
});