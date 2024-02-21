const User=require("../Model/User");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
require("dotenv").config();
// const cookie=require("cookie-parser")


//  sign up 
exports.signUp=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!email||!password||!name||!role){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }

        // Secure password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"Error while hashing Password",
            })
        }

        // Create entry for user
        const user=await User.create({name,email,password:hashedPassword,role});

        return res.status(200).json({
            success:true,
            message:"Signed up successfully",
            data:user
        })

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in signUp",
        })
    }
}


// login 
exports.logIn=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        // check if user have signed in or not
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Email not registered",
            })
        }

        let payload={
            email:user,
            id:user._id,
            role:user.role
        }

        // Verify password
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"10h",
            });
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            return res.status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            })

        }
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in Login",
        })
    }
}