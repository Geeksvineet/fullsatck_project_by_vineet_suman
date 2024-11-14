import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import LandingPage from "./pages/LandingPage";
import Contacts from "./pages/Contacts";
import Subscriptions from "./pages/Subscriptions";

function App() {
  return (
    // Wrap the entire app in the Router and AuthProvider
    <Router>
      <AuthProvider>
        {" "}
        {/* AuthProvider is now inside Router */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/projects"
            element={<ProtectedRoute element={<Projects />} />}
          />
          <Route
            path="/clients"
            element={<ProtectedRoute element={<Clients />} />}
          />
          <Route
            path="/contacts"
            element={<ProtectedRoute element={<Contacts />} />}
          />
          <Route
            path="/subscriptions"
            element={<ProtectedRoute element={<Subscriptions />} />}
          />
          {/* Add other protected routes as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
