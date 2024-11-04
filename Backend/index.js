const express = require("express");
const dotenv = require("dotenv");
const  cors = require("cors");
const mongoose = require("mongoose");
const authRout = require("./routes/auth")

dotenv.config();
const app = express();


//MIDDLEWARES
app.use(cors());
app.use(express.json());

//ROUTES

app.use("/auth", authRout)

//DATABASE CONNECTION
const DB = process.env.DB;
mongoose.connect(DB).then(()=>{
    console.log("DB connection is successful");
}).catch((err)=>{
console.log(err)
})


//SERVER
const  PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

