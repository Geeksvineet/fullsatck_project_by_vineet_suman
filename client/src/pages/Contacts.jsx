import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  // Fetch all contacts
  useEffect(() => {
    async function fetchContacts() {
      const token = sessionStorage.getItem("token"); // Get token from sessionStorage
      try {
        const response = await axios.get("/api/contacts", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error(
          "Error fetching contacts:",
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchContacts();
  }, []);

  // Delete a contact
  const deleteContact = async (contactId) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`/api/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(contacts.filter((contact) => contact._id !== contactId)); // Remove the deleted contact from state
    } catch (error) {
      console.error(
        "Error deleting contact:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Contacts</h1>
        </div>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <h2 className="font-semibold text-xl text-gray-900 mb-2">
                  {contact.name}
                </h2>
                <p className="text-gray-700 mb-2">Email: {contact.email}</p>
                <p className="text-gray-700 mb-2">Mobile: {contact.mobile}</p>
                <p className="text-gray-700">City: {contact.city}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Contacts;
