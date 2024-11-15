import React from 'react';

function Navbar() {
    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage for this example
            const response = await fetch('https://fullsatck-project-by-vineet-suman-server.onrender.com/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Optionally, remove the token from sessionStorage after successful logout
                sessionStorage.removeItem('token');
                // Redirect to login page or another page
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-gray-800 text-white h-16 px-4">
            <h2 className="text-xl">Admin Dashboard</h2>
            <button
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-700"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Navbar;
