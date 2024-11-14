const Client = require('../models/Client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setting storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsClients/'); // Save images to the 'uploadsClients' directory
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + fileExtension; // Add timestamp to avoid name conflicts
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Middleware to handle image uploads (for creating or updating a client)
exports.uploadImage = upload.single('image'); // Assuming the field name for the image is 'image'

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    const image = req.file ? req.file.path : ''; // Get image path from multer

    const client = new Client({
      name,
      designation,
      description,
      image
    });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    const newImagePath = req.file ? req.file.path : ''; // If a new image is provided, get its path

    // Find the client to check the existing image path
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // If a new image is uploaded and an old image exists, delete the old image
    if (newImagePath && client.image) {
      const oldImagePath = path.join(__dirname, '..', client.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
    }

    // Update the client with new data and the new image path (if provided)
    client.name = name;
    client.designation = designation;
    client.description = description;
    client.image = newImagePath || client.image;

    await client.save();

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    // Find the client by ID
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // If the client has an image, delete it from the file system
    if (client.image) {
      const imagePath = path.join(__dirname, '..', client.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });
    }

    // Delete the client from the database
    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Client and associated image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
