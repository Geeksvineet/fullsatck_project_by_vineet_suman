import React, { useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import footerImage from "./../assets/images/Rectangle.svg";
import Logo from "./../assets/images/white_logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Subscribed successfully!");
        setEmail(""); // Clear the input field
      } else {
        const data = await response.json();
        alert(data.message || "Subscription failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section with Text and Button */}
      <div
        className="py-24 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${footerImage})` }}
      >
        {/* Black transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Learn more about our listing process, as well as our <br /> additional
            staging and design work.
          </h2>
          <button className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Navigation and Subscription Section */}
      <div className="bg-blue-600 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Navigation Links */}
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4 text-sm font-semibold">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Subscription Form */}
          <form className="flex items-center" onSubmit={handleSubscribe}>
            <span className="mr-4 text-sm font-semibold">Subscribe In</span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-l-md text-gray-900 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
               className="bg-gray-800 text-white p-2 rounded-r-md hover:bg-gray-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section with Copyright and Social Media */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; All Rights Reserved 2023
          </p>

          {/* Logo (optional) */}
          <div className="text-xl font-semibold text-white">
            <img src={Logo} alt="Logo" className="h-8 inline-block mr-2" />
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
