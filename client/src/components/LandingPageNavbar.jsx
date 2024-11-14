import React, { useState } from 'react';
import logo from './../assets/images/logo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg relative z-20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <img src={logo} alt="Logo" className="h-8 inline-block mr-2" />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-12 items-center font-bold text-base">
                    <a href="#home" className="hover:text-blue-500">Home</a>
                    <a href="#services" className="hover:text-blue-500">Services</a>
                    <a href="#about" className="hover:text-blue-500">About</a>
                    <a href="#projects" className="hover:text-blue-500">Projects</a>
                    <a href="#testimonials" className="hover:text-blue-500">Testimonials</a>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Contact</button>
                </div>

                {/* Hamburger Icon */}
                <button
                    className="md:hidden focus:outline-none text-3xl"
                    onClick={toggleMenu}
                >
                    <span className="material-icons">{isOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-lg transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-30`}
            >
                <div className="flex flex-col items-center space-y-6 mt-20 font-bold text-base">
                    <a href="#home" className="hover:text-blue-500" onClick={toggleMenu}>Home</a>
                    <a href="#services" className="hover:text-blue-500" onClick={toggleMenu}>Services</a>
                    <a href="#about" className="hover:text-blue-500" onClick={toggleMenu}>About</a>
                    <a href="#projects" className="hover:text-blue-500" onClick={toggleMenu}>Projects</a>
                    <a href="#testimonials" className="hover:text-blue-500" onClick={toggleMenu}>Testimonials</a>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        onClick={toggleMenu}
                    >
                        Contact
                    </button>
                </div>
            </div>

            {/* Overlay Background */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20"
                    onClick={toggleMenu}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
