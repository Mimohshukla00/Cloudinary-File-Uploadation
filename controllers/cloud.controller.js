const File = require("../models/cloud.model");
const cloudinary = require("cloudinary").v2;

exports.localfileHandler = async (req, res) => {
  try {
    const file = req.files.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log(file);
    let path = `${__dirname}/files/${Date.now()}.${file.name.split(".").pop()}`;

    console.log(path);
    await file.mv(path); // Wait for the file to move

    // Set tempFilePath for later use
    file.tempFilePath = path; // Set the tempFilePath to the file object

    res.json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

function fileSupported(fileType, supportedFile) {
  return supportedFile.includes(fileType);
}

// async function uploadFileToCloud(file, folder) {
//   const options = { folder };
//   try {
//     const result = await cloudinary.uploader.upload(file.tempFilePath, options);
//     return result; // Return the result of the upload
//   } catch (error) {
//     throw new Error("Cloud upload failed");
//   }
// }

async function uploadFileToCloud(file, folder) {
  const options = { folder };
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result; // You might want to return the result for further processing
  } catch (error) {
    console.error("Cloudinary upload error:", error); // Log the error
    throw new Error("Cloud upload failed"); // Re-throw the error for handling in the caller
  }
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log(file);
    const supportedFile = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!fileSupported(fileType, supportedFile)) {
      return res.status(400).json({
        message: "File type not supported",
        success: false,
      });
    }
    console.log("Uploading file from path:", file.tempFilePath);

    const fileToUpload = await uploadFileToCloud(file, "images");
    // db entry (if applicable)
    const dbEntry = await File.create({
      name,
      tags,
      email,
      imageUrl: fileToUpload.secure_url,
    });

    res.json({
      message: "File uploaded successfully",
      data: dbEntry, // Optionally return the upload result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file",
      success: false,
    });
  }
};
