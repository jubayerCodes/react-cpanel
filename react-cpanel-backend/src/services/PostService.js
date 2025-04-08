const PostModel = require("../models/PostModel")
const multer = require('multer');
const path = require('path');

const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Keep original file extension
    }
  });

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } });

const PostAddService = async (req) => {
    try {
        const data = req?.body

        if (req.file) {
            data.postImg = req.file.filename;
        }

        const newPost = new PostModel(data)
        await newPost.save()

        return {
            status: "success",
            message: "Post added successfully",
            data: newPost,
          };
    } catch (error) {
        console.error("Error in PostAddService:", error.message);
        return { status: "fail", message: "Error adding Post. Please try again." };
    }
}

const PostListService = async() =>{
    try {
        const data = await PostModel.find().sort({ createdAt: -1 })
        return { status: "success", data: data }; // Ensure JSON response
    } catch (error) {
        return { status: "Fail", data: e.toString() }; // Ensure JSON error response
    }
}

const PostDetailsService = async (id) =>{
    try {
        const data = await PostModel.findById(id)
        return { status: "success", data: data }; // Ensure JSON response
    } catch (error) {
        return { status: "Fail", data: e.toString() }; // Ensure JSON error response
    }
}

module.exports = {
    upload,
    PostListService,
    PostDetailsService,
    PostAddService
}