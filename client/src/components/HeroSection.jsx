import React, { useState } from "react";
import axios from "axios";
import heroImage from "./../assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contacts", formData);
      alert("Thank you! Your consultation request has been submitted.");
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-16">
        
        {/* Left side text */}
        <div className="text-white max-w-lg text-center md:text-left my-24 md:mb-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            Consultation, Design, & Marketing
          </h1>
        </div>

        {/* Right side form */}
        <div className="bg-blue-900 bg-opacity-80 p-6 md:p-8 rounded-lg text-white w-full max-w-xs md:max-w-sm lg:max-w-md">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Get a Free Consultation
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile No."
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Area/City"
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 w-full p-2 rounded text-white font-bold hover:bg-orange-600"
            >
              Send Quick Query
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
