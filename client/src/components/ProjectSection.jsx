// src/components/ProjectSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://fullsatck-project-by-vineet-suman-server.onrender.com/api/projects");
        
        console.log("API response:", response.data); // Debug log for API response
        
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Projects</h2>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">
            No projects available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
