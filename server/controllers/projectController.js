const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setting storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsProjects/'); // Save images to the 'uploadsProjects' directory
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Get file extension
    const uniqueSuffix = Date.now() + fileExtension; // Add timestamp to avoid name conflicts
    cb(null, file.fieldname + '-' + uniqueSuffix); // Save with file extension
  },
});

const upload = multer({ storage: storage });

// Middleware to handle image uploads (for creating or updating a project)
exports.uploadImage = upload.single('image'); // Assuming the field name for the image is 'image'

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : ''; // Get image path from multer

    const project = new Project({
      name,
      description,
      image
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newImagePath = req.file ? req.file.path : ''; // If a new image is provided, get its path

    // Find the project to check the existing image path
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // If a new image is uploaded and an old image exists, delete the old image
    if (newImagePath && project.image) {
      const oldImagePath = path.join(__dirname, '..', project.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
    }

    // Update the project with new data and the new image path (if provided)
    project.name = name;
    project.description = description;
    project.image = newImagePath || project.image; // Use new image if provided, otherwise keep the old one

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    // Find the project by ID
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // If the project has an image, delete it from the file system
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image); // Construct the full path of the image
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err); // Log error if any
        }
      });
    }

    // Delete the project from the database
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project and associated image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
