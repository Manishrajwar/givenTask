const mongoose = require("mongoose");
require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true, // Use the new URL parser
        useUnifiedTopology: true, // Use the new server discovery and monitoring engine
        
    }).then(() => {
        console.log("Connected to database successfully");
    }).catch(err => {
        console.error("Error connecting to database:", err);
        console.log(err);
        process.exit(1);
    });
}

module.exports = connectWithDb;
