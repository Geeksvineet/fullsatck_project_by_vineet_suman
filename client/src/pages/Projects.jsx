import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProjectModal from "../components/AddProjectModal"; // Importing AddProjectModal component

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch all projects
  useEffect(() => {
    async function fetchProjects() {
      const token = sessionStorage.getItem("token"); // Get token from sessionStorage
      try {
        const response = await axios.get("https://fullsatck-project-by-vineet-suman-server.onrender.com/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchProjects();
  }, []);

  // Open modal to add a new project
  const openAddModal = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  // Open modal to edit an existing project
  const openEditModal = (project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`https://fullsatck-project-by-vineet-suman-server.onrender.com/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter((project) => project._id !== projectId)); // Remove the deleted project from state
    } catch (error) {
      console.error(
        "Error deleting project:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <h2 className="font-semibold text-xl text-gray-900 mb-2">
                  {project.name}
                </h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                {project.image && (
                  <img
                    src={`https://fullsatck-project-by-vineet-suman-server.onrender.com/${project.image}`}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-blue-600 hover:text-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <AddProjectModal
            projectToEdit={projectToEdit}
            closeModal={() => setIsModalOpen(false)}
            fetchProjects={async () => {
              const token = sessionStorage.getItem("token");
              const response = await axios.get("https://fullsatck-project-by-vineet-suman-server.onrender.com/api/projects", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setProjects(response.data);
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export default Projects;
