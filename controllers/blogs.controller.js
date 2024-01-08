// const Blogs= require("../models/blogs.model");

//importing the instance of BlogService class
const BlogServiceInstance = require("../services/blogs.service");



const createNewBlog = async(req, res) => {
    try
    {
    console.log(req.body);

    //removed bussiness logic, use service layer class method here
    const result= await BlogServiceInstance.create(req.body);
    res.status(201).json(result); //successfully created
}
 catch (error) {
  res.status(500).json({
      message: "Couldn't create new blog post. Please try again",
      error,
    });
}

}

//finding some data in db is an asychronous operation that is why async-await
const getAllBlogs = async(req,res)=>{
    try{
        // const blogs=await Blogs.find({}); //removed bussiness logic, use service layer class method here
        const blogs = await BlogServiceInstance.findAll();
        res.json(blogs);
    }
    catch(error){
        res.status(404).json({ message: "Could Not Fetch Blogs from DB", error });

    }
}

const deleteBlogWithId =async(req,res)=>{
    console.log(req.params);
    try {
        const { id } = req.params;
        const result = await BlogServiceInstance.delete(id);
        res.json(result);
      } catch {
        res
          .status(500)
          .json({ message: "Couldn't delete blog post. Please try again" });
      }
    
}

const updateBlogsWithId =async(req,res)=>{
    try{
        const { id } = req.params;    
        const result = await BlogServiceInstance.update(id);
        res.json(result);
     }
    catch(error){
        res.status(500).json({ message: "Couldn't delete blog post. Please try again" });
    }
}
   
// 1. For finding elements inside an array we use a special operator $elemMatch that matches the elements inside an array.
// Also to search within a nested field, we would nest the query too.

const searchBlogs = async (req, res) => {
    console.log(req.query);
    const { title, author } = req.query;
    try {
      const result = await BlogServiceInstance.search(title,author);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Couldn't fetch blog posts. Please try again", error }); 

    }
  };
  
  
module.exports={createNewBlog, getAllBlogs, deleteBlogWithId, updateBlogsWithId, searchBlogs};
