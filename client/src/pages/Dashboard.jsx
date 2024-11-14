import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [counts, setCounts] = useState({
        projects: 0,
        clients: 0,
        contacts: 0,
        subscriptions: 0,
    });
    const navigate = useNavigate();

    // Fetch and count items for all sections
    useEffect(() => {
        async function fetchCounts() {
            const token = sessionStorage.getItem("token");
            try {
                const [projectsRes, clientsRes, contactsRes, subscriptionsRes] = await Promise.all([
                    axios.get("/api/projects", { headers: { Authorization: `Bearer ${token}` }}),
                    axios.get("/api/clients", { headers: { Authorization: `Bearer ${token}` }}),
                    axios.get("/api/contacts", { headers: { Authorization: `Bearer ${token}` }}),
                    axios.get("/api/subscriptions", { headers: { Authorization: `Bearer ${token}` }}),
                ]);

                // Manually count each section's length from the response data arrays
                setCounts({
                    projects: projectsRes.data.length,
                    clients: clientsRes.data.length,
                    contacts: contactsRes.data.length,
                    subscriptions: subscriptionsRes.data.length,
                });
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        }

        fetchCounts();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-500 text-white p-4 rounded shadow flex flex-col justify-between">
                    <p>Total Projects: {counts.projects}</p>
                    <button 
                        onClick={() => navigate('/projects')} 
                        className="bg-white text-blue-500 px-4 py-2 rounded mt-2 hover:bg-blue-200 transition"
                    >
                        Show
                    </button>
                </div>
                <div className="bg-green-500 text-white p-4 rounded shadow flex flex-col justify-between">
                    <p>Total Clients: {counts.clients}</p>
                    <button 
                        onClick={() => navigate('/clients')} 
                        className="bg-white text-green-500 px-4 py-2 rounded mt-2 hover:bg-green-200 transition"
                    >
                        Show
                    </button>
                </div>
                <div className="bg-yellow-500 text-white p-4 rounded shadow flex flex-col justify-between">
                    <p>Contact Messages: {counts.contacts}</p>
                    <button 
                        onClick={() => navigate('/contacts')} 
                        className="bg-white text-yellow-500 px-4 py-2 rounded mt-2 hover:bg-yellow-200 transition"
                    >
                        Show
                    </button>
                </div>
                <div className="bg-purple-500 text-white p-4 rounded shadow flex flex-col justify-between">
                    <p>Newsletter Subscriptions: {counts.subscriptions}</p>
                    <button 
                        onClick={() => navigate('/subscriptions')} 
                        className="bg-white text-purple-500 px-4 py-2 rounded mt-2 hover:bg-purple-200 transition"
                    >
                        Show
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
