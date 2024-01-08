const mongoose = require("mongoose");
const validator = require("validator");

// We need to define a schema so that we never pollute our DB with unwanted data type values for keys in our DB
// This schema will also trigger an internal validator for data types when storing data to DB.

// When we define a new schema with mongoose, it automatically attaches a unique ObjectId(_id) with it. disable this behaviour by passing in an option {_id: false} with the schema

const authorSchema = new mongoose.Schema({
  fullName:{type: String, required: true, maxlength: 25},
  twitterHandle:{type: String},
  email:{
    type: String, 
    required: true, 
    maxlength: 50, 
    validate: (value) => validator.isEmail(value), //returns boolean value
  },
  image:{
    type: String,
    validate: (value)=> validator.isURL(value),
  },
},
{ _id: false }
);

//we can directly pass the refernce to the authorSchema, do this to create nested schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: [authorSchema],
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
  );

  // provided timestamps field to get the time of creation for any doc
  

// A Mongoose model is a wrapper on the Mongoose schema that provides an interface to the database for creating, querying, updating, deleting records, etc.
// const blogModel = mongoose.model("Blogs", blogSchema);

// Here, the first argument is the singular name of the collection your model is for. In your case, it's "Blogs". Mongoose, by convention, 
// will create a collection in MongoDB with a name derived from the lowercase, plural version of this argument (e.g., "blogs").(because its already plural)
// another eg: const Person = mongoose.model("Person", personSchema);
// Now, 'Person' is a model for the 'people' collection in MongoDB

// module.exports={blogModel};
module.exports=mongoose.model("Blogs", blogSchema);

// body of a post request for adding a doc with above schema could be like this:
// {
//   "title": "Sample Blog Title",
//   "author": [
//     {
//       "fullName": "John Doe",
//       "twitterHandle": "@johndoe",
//       "email": "john.doe@example.com",
//       "image": "https://example.com/johndoe.jpg"
//     },
//   ],
//   "content": "This is the content of the blog.",
//   "publishedAt": "2023-12-01T12:00:00Z"
// }
