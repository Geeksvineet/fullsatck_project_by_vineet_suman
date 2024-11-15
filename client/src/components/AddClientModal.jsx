import React, { useState, useEffect } from "react";
import axios from "axios";

function AddClientModal({ clientToEdit, closeModal, fetchClients }) {
  const [name, setName] = useState(clientToEdit ? clientToEdit.name : "");
  const [designation, setDesignation] = useState(clientToEdit ? clientToEdit.designation : "");
  const [description, setDescription] = useState(clientToEdit ? clientToEdit.description : "");
  const [image, setImage] = useState(null); // Image state (for preview)
  const [previewUrl, setPreviewUrl] = useState(null); // Preview of the selected image
  const [error, setError] = useState("");

  // Effect to set the image when clientToEdit is available
  useEffect(() => {
    if (clientToEdit && clientToEdit.image) {
      setImage(clientToEdit.image); // Set the image URL for preview if available
    }
  }, [clientToEdit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the new image
      setPreviewUrl(URL.createObjectURL(file)); // Update preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("description", description);

    // Check if image exists before appending to formData
    if (image && previewUrl) {
      const file = e.target.elements.image.files[0]; // Get the image file
      if (file) {
        formData.append("image", file); // Append the image file
      }
    }

    const token = sessionStorage.getItem("token");

    try {
      let response;
      if (clientToEdit) {
        // Editing existing client
        response = await axios.put(`https://fullsatck-project-by-vineet-suman-server.onrender.com/api/clients/${clientToEdit._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Adding new client
        response = await axios.post("https://fullsatck-project-by-vineet-suman-server.onrender.com/api/clients", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchClients(); // Refresh the client list after successful operation
      closeModal(); // Close modal after save
    } catch (error) {
      setError(
        error.response ? `Error: ${error.response.data.message}` : "An unknown error occurred."
      );
      console.error("Error saving client:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="overflow-auto fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-2xl font-bold mb-4">
          {clientToEdit ? "Edit Client" : "Add Client"}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Client Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Client Image</label>
            <input type="file" onChange={handleFileChange} className="w-full" name="image" />
            {previewUrl && (
              <div className="mt-4">
                <label className="block text-gray-700">Image Preview:</label>
                <img src={previewUrl} alt="Preview" className="mt-2 w-full h-auto rounded" />
              </div>
            )}
            {clientToEdit && !image && (
              <div className="mt-4">
                <label className="block text-gray-700">Existing Image:</label>
                <img src={clientToEdit.image} alt="Existing Client Image" className="mt-2 w-full h-auto rounded" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {clientToEdit ? "Save Changes" : "Add Client"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-2 text-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClientModal;
