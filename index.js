const express=require("express");
const app=express();

require("dotenv").config();

const PORT=process.env.PORT || 4000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const connect=require("./config/Database");
connect();

const user=require("./Routes/user.js");

app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
