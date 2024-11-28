const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendmail");
const Parcel = require("../models/Parcel");

dotenv.config();

const SendParcelPendingEmail = async () => {
  const parcels = await Parcel.find({ status: 0 });

  if (parcels.length > 0) {
    for (let parcel of parcels) {
      // For sender email
      ejs.renderFile(
        "templates/pendingparcel.ejs",
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, data) => {
          if (err) {
            console.error("Error rendering EJS template for sender:", err);
            return;
          }

          const messageOption = {
            from: process.env.EMAIL,
            to: parcel.senderemail,
            subject: "Your parcel is being processed",
            html:  data, // Use the rendered HTML
          };

          try {
            await sendMail(messageOption);
          } catch (error) {
            console.error("Error sending email to sender:", error);
          }
        }
      );

      // For recipient email
      ejs.renderFile(
        "templates/pendingparcel.ejs",
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, data) => {
          if (err) {
            console.error("Error rendering EJS template for recipient:", err);
            return;
          }

          const messageOption = {
            from: process.env.EMAIL,
            to: parcel.recipientemail,
            subject: "You've got a parcel",
            html: data,
          };

          try {
            await sendMail(messageOption);
            await Parcel.findByIdAndUpdate(parcel._id, { $set: { status: 1 } });
          } catch (error) {
            console.error("Error sending email to recipient or updating parcel status:", error);
          }
        }
      );
    }
  }
};

module.exports = { SendParcelPendingEmail };
