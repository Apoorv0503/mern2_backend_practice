const router = require("express").Router();
const { createNewBlog, getAllBlogs, deleteBlogWithId, updateBlogsWithId, searchBlogs } = require("../controllers/blogs.controller");

router.post("/new", createNewBlog);
router.delete("/:id", deleteBlogWithId);
router.get("/",getAllBlogs);
router.put("/:id",updateBlogsWithId);
router.get("/search",searchBlogs);


module.exports = router;