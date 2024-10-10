const mongoose = require("mongoose");
require("dotenv");
exports.connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(" error while connecting Database", err);
    });
};
