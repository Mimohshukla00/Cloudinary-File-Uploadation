const express = require("express");
const { connectDb } = require("./config/db");
const app = express();
require("dotenv").config();
connectDb();

app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// connect to cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/cloud.route");

app.use("/api/v1/upload", Upload);

const PORT = process.env.PORT || 3000;

// db connect
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
