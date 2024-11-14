import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  // Fetch all subscriptions
  useEffect(() => {
    async function fetchSubscriptions() {
      const token = sessionStorage.getItem("token"); // Get token from sessionStorage
      try {
        const response = await axios.get("/api/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        setSubscriptions(response.data);
      } catch (error) {
        console.error(
          "Error fetching subscriptions:",
          error.response ? error.response.data : error.message
        );
      }
    }

    fetchSubscriptions();
  }, []);

  // Delete a subscription
  const deleteSubscription = async (subscriptionId) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`/api/subscriptions/${subscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(subscriptions.filter((sub) => sub._id !== subscriptionId)); // Remove the deleted subscription from state
    } catch (error) {
      console.error(
        "Error deleting subscription:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Subscriptions</h1>
        </div>

        {subscriptions.length === 0 ? (
          <p className="text-center text-gray-500">No subscriptions available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <p className="font-semibold text-gray-900 mb-2">
                  Email: {subscription.email}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deleteSubscription(subscription._id)}
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

export default Subscriptions;
