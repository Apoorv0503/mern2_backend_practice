const Blogs= require("../models/blogs.model");

class BlogService{
    save=async(doc)=>{
        // to save above doc in the db we have a Promise on the doc named save()
        const result= await doc.save();
        return result;
    }

    //1. create a new blog with the help of model and save()

    //2. when only title was sent in body
    // const {title}=req.body;
    // const newBlogDoc = new Blogs({title}); 

    //1. either write new Blogs.blogModel({title}); here if exported like this:  module.exports={blogModel};
    //2. or directly export like this: module.exports=mongoose.model("Blogs", blogSchema); and use new Blogs({title: "First Blog"}); here

    create=async(body)=>{
        // Destructure blog data from the request body
        const { title, author, content, publishedAt } = body;

        // Create a new blog document
        const newDoc= new Blogs({ title, author, content, publishedAt }); // Assuming that 'author' contains an array of author objects based on the provided schema
        const savedDoc= this.save(newDoc);
       return savedDoc;  //no need to return and status code and json, we'll do that in controller
    }

    findAll=async()=>{
        const allBlogs = await Blogs.find({});
        return allBlogs;
    }

// to delete using mongoDB: db.blogs.remove( { _id: ObjectId("61c81cca4112d97895e4911b") } ); 
//but to delete using mongoose:  Model.findByIdAndDelete(IdToDelete, callBack_function);
    delete=async(id)=>{
         // when using findOneAndDelete or similar methods, you typically pass a query object to specify the conditions for the deletion. However, the _id field in MongoDB is a special case, and you can pass the id directly also
        //  The reason for this behavior is that Mongoose automatically converts the string id to a valid ObjectId, which is required when querying by _id.
        const result = await Blogs.findOneAndDelete({ _id: id });
        return result;
    }

    update=async(id)=>{
        const filter = { _id: id }; //conditions to find the document
        const update = req.body; //updates to be perfomed
        //new: true -> returns the updated document
        const result = await Blogs.findOneAndUpdate(filter, update, { new: true }); 
        return result;
    }

    // the search returns some results, if either title or author or both are passed.To match with OR conditions, we have an $or operator that has an array of conditions to match.
    //  if we don’t want to match the exact string, but a part of it only. use regex   
    search=async(title,author)=>{
        const result = await Blogs.find({ 
            $or: [
                { title: { $regex: new RegExp(title), $options: "gi" } },
                { author: { $elemMatch: { email: author} } },
              ],
        
        });
        return result;
    }
}


// module.exports={BlogService}; //incorrect 
// Exporting an instance of the BlogService class 
module.exports = new BlogService();