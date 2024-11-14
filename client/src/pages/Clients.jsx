import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddClientModal from "../components/AddClientModal"; // Importing AddClientModal component

function Clients() {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch all clients
  useEffect(() => {
    async function fetchClients() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get("/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error(
          "Error fetching clients:",
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchClients();
  }, []);

  // Open modal to add a new client
  const openAddModal = () => {
    setClientToEdit(null);
    setIsModalOpen(true);
  };

  // Open modal to edit an existing client
  const openEditModal = (client) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  // Delete a client
  const deleteClient = async (clientId) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`/api/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error(
        "Error deleting client:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Clients</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Client
          </button>
        </div>

        {clients.length === 0 ? (
          <p className="text-center text-gray-500">No Clients available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <h2 className="font-semibold text-xl text-gray-900 mb-2">
                  {client.name}
                </h2>
                <p className="text-gray-600 italic mb-2">
                  {client.designation}
                </p>{" "}
                {/* Designation field */}
                <p className="text-gray-700 mb-4">{client.description}</p>
                {client.image && (
                  <img
                    src={`http://localhost:5000/${client.image}`}
                    alt={client.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openEditModal(client)}
                    className="text-blue-600 hover:text-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClient(client._id)}
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
          <AddClientModal
            clientToEdit={clientToEdit}
            closeModal={() => setIsModalOpen(false)}
            fetchClients={async () => {
              const token = sessionStorage.getItem("token");
              const response = await axios.get("/api/clients", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setClients(response.data);
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export default Clients;
