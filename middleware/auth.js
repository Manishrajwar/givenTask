const jwt=require("jsonwebtoken");
require("dotenv").config();

// For authentication
exports.authen=(req,res,next)=>{
    try{
        const token=req.header("Authorization").replace("Bearer ","");

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token missing"
        })
    }

    // Verify token
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload);

        req.user=payload;
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Token not verified"
        })
    }
    next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in verifing token"
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        const client=req.user.role;
        if(client!=="Admin"){
            return res.status(400).json({
                success:false,
                message:"This route is only for admins"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Role not Matched"
        })
    }
}
