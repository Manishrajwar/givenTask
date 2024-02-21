// username , email , password , googleId: string  , Blogs => array of object ,
const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        // trim:true
    },
    email:{
        type:String,
        // required:true,
        // trim:true
    },
    password:{
        type:String,
        // required:true,
    },
  
    blogs:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blogs"
        }
    ],
    role:{
        type:String,
        enum:["Admin","User"],
    }

});
module.exports=mongoose.model("User",UserSchema);