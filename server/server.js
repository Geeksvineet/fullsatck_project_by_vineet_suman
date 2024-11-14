const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
// Serve static files (images) from the 'uploadsProjects' folder
app.use('/uploadsProjects', express.static(path.join(__dirname, 'uploadsProjects')));
app.use('/uploadsClients', express.static(path.join(__dirname, 'uploadsClients')));


app.use(express.json());

// Enable CORS for the frontend origin
app.use(cors({ origin: 'https://fullsatck-project-by-vineet-suman-client.onrender.com' }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
