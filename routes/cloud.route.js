const express = require("express");

const router = express.Router();

// Import the controller function for handling file uploads
const {
  localfileHandler,
  imageUpload,
} = require("../controllers/cloud.controller");

router.post("/localFileUpload", localfileHandler);
router.post("/imageUpload", imageUpload);

// Export the router to be used in other modules
module.exports = router;
