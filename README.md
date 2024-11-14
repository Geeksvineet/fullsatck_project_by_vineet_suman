# Real Trust Consultation Website

## Overview
The **Real Trust Consultation Website** is a responsive web application designed for a consultation, design, and marketing firm. The website serves as a powerful lead-generation tool, helping users understand the firm’s offerings, view past projects, read testimonials, and request consultations. The project includes a **user-facing landing page** and an **Admin Panel** for managing consultations and user requests.

---

## Table of Contents

- [Features](#features)
  - [User-Facing Features](#user-facing-features)
  - [Admin Panel](#admin-panel)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Panel Access](#admin-panel-access)
- [Folder Structure](#folder-structure)
- [Detailed Components](#detailed-components)
- [Future Enhancements](#future-enhancements)
- [Conclusion](#conclusion)

---

## Features

### User-Facing Features

1. **Responsive Navbar**:
   - Collapsible navbar with a hamburger menu for mobile view.
   - Links to: Home, Services, About, Projects, Testimonials, and a prominent "Contact" button.

2. **Hero Section with Contact Form**:
   - Full-width hero banner with a background image.
   - Sidebar form overlay for requesting a consultation (name, email, mobile, and city).

3. **Services Section**:
   - Highlights the firm’s services, including consultation, design, and marketing.

4. **About Section**:
   - Information about the firm, including values, mission, and expertise to build credibility.

5. **Projects Section**:
   - Showcases completed projects with descriptions and details to illustrate the firm’s work quality.

6. **Testimonials Section**:
   - Displays client testimonials to boost trust and reinforce the firm's reputation.

---

### Admin Panel

- **Consultation Management**:  
   - Admin can view and manage incoming consultation requests, track leads, and keep all submissions organized.
   - Admin access is restricted to authorized users with login credentials.

---

## Tech Stack

### Frontend
- **React**: A component-based library for building an interactive user interface.
- **Tailwind CSS**: A utility-first CSS framework for fast styling and responsiveness.
- **Vite**: A fast development server and build tool for a smooth experience.

### Backend
- **Node.js & Express**: For handling the API that manages form submissions and backend operations.
- **Axios**: For making HTTP requests from the frontend to the backend API.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/real-trust-consultation.git
cd real-trust-consultation

Install Dependencies
Frontend
bash
Copy code
cd client
npm install
Backend
bash
Copy code
cd server
npm install
Environment Variables
Create a .env file in the server folder and add the following variables:

env
Copy code
PORT=5000
DATABASE_URI=your_database_uri
Run the Application
Backend
bash
Copy code
cd server
npm start
Frontend
bash
Copy code
cd client
npm run dev
The frontend will run at http://localhost:5173 and the backend at http://localhost:5000.

Usage
Open your browser and go to http://localhost:3000.
Navigate through the different sections of the website: Home, Services, About, Projects, Testimonials.
Use the Contact Form in the Hero Section to submit your details for a free consultation.
Admin Panel Access
The Admin Panel allows the site administrator to view and manage consultation requests. This access is restricted to authorized users.

Accessing the Admin Panel
Login URL: http://localhost:3000/admin
Credentials:
Username: admin
Password: admin123
After logging in, the admin can view a list of consultation requests submitted via the contact form and manage them as necessary.

Folder Structure
bash
Copy code
real-trust-consultation/
├── client/             # Frontend files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── assets/     # Images and assets
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
├── server/             # Backend files
│   ├── controllers/    # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── server.js       # Main server file
│   └── .env            # Environment variables
└── README.md           # Project documentation
