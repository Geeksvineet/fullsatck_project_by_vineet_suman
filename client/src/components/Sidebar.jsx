import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <h1 className="text-2xl font-bold text-center py-4">Admin Panel</h1>
            <nav className="flex flex-col space-y-4">
                <Link to="/admin" className="px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                <Link to="/projects" className="px-4 py-2 hover:bg-gray-700">Projects</Link>
                <Link to="/clients" className="px-4 py-2 hover:bg-gray-700">Clients</Link>
                <Link to="/contacts" className="px-4 py-2 hover:bg-gray-700">Contacts</Link>
                <Link to="/subscriptions" className="px-4 py-2 hover:bg-gray-700">Subscriptions</Link>
            </nav>
        </div>
    );
}

export default Sidebar;
