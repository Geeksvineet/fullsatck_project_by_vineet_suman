const express = require('express');
const { createProject, getProjects, updateProject, deleteProject, uploadImage } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
// const multer = require('multer');


// const upload = multer({ dest: 'uploads/' });

router.post('/', auth, uploadImage, createProject);       // Create project (protected)
router.get('/', getProjects);          // Get projects (protected)
router.put('/:id', auth, uploadImage , updateProject);     // Update project (protected)
router.delete('/:id', auth, deleteProject);  // Delete project (protected)

module.exports = router;
