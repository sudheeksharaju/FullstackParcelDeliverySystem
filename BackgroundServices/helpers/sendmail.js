const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

function createTransporter (config){
    const transporter = nodemailer.createTransport(config)
    return transporter;
}

let configurations = {
    service: "gmail",
    host:"smtp.gmail.com",
    port:587,
    requireTLS:true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
};