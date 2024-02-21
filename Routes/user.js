const express=require("express");
const router=express.Router();

// Import Controller
const{signUp,logIn}=require("../Controller/auth");
const { authen,isAdmin } = require("../middleware/auth");

// Map controller
router.post("/login",logIn);
router.post("/signup",signUp);

// Protected Routes
router.get("/admin",authen,isAdmin,(req,res)=>{
    return res.json({
        success:true,
        message:"You can create the blog ",
    })
})

module.exports=router;