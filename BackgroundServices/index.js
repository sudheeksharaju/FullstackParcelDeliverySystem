const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cron = require("node-cron");
const mongoose = require("mongoose");
const sendMail = require("./helpers/sendmail");
const { sendWelcomeEmail } = require("./EmailService/WelcomeEmail.js");
const { SendParcelPendingEmail } = require("./EmailService/PendingParcel.js");
const { sendParcelDeliveredEmail } = require("./EmailService/DeliveredParcel.js");
dotenv.config();


//DB CONNECTION
const DB=process.env.DB;
mongoose
.connect(DB)
.then(()=>{
   console.log("DB connection is successful"); 
}).catch((e)=>{
    console.log(e);
})

//TASK SCHEDULER

const run = () =>{
    cron.schedule('* * * * * *', () => {
        sendWelcomeEmail();
        SendParcelPendingEmail();
        sendParcelDeliveredEmail();
    });
};

run();

//SERVER
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Backgroundservices is running on port ${PORT}`);
    
});
