const {getAllUsers,SearchByUuid,searchByQuery}= require("../controllers/users.controller");

// Express has a constructor function to initialize a new Router instance
const router=require("express").Router();

router.get("/",getAllUsers);
router.get("/search",searchByQuery);
router.get("/:uuid",SearchByUuid);



module.exports = router;
