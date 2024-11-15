// LandingPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import LandingPageNavbar from "../components/LandingPageNavbar";
import HeroSection from "../components/HeroSection";
import LandingPageFooter from "../components/LandingPageFooter";
// import "../../public/style2.css";

// images
import Ellipse11 from "./../assets/images/Ellipse 11.svg";
import Ellipse12 from "./../assets/images/Ellipse 12.svg";
import Ellipse13 from "./../assets/images/Ellipse 13.svg";
// import Ellipse7 from "./../assets/shapes/Ellipse 7.svg";

import iconHome from "./../assets/icons/home.svg";
import iconPaintBrush from "./../assets/icons/paintbrush-2.svg";
import iconDollar from "./../assets/icons/circle-dollar-sign.svg";

import img1 from "./../assets/images/pexels-andres-ayrton-6578391.svg";
import img2 from "./../assets/images/pexels-brett-sayles-2881232.svg";
import img3 from "./../assets/images/pexels-fauxels-3182834.svg";

import lineShape from "./../assets/shapes/Rectangle 58.svg";
import CardSlider from "../components/CardSliderProjects";
import CardSliderClients from "../components/CardSliderClients";

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  // Fetch projects and clients from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("https://fullsatck-project-by-vineet-suman-server.onrender.com/api/projects"); // replace with your backend endpoint
      setProjects(res.data);
    };
    const fetchClients = async () => {
      const res = await axios.get("https://fullsatck-project-by-vineet-suman-server.onrender.com/api/clients"); // replace with your backend endpoint
      setClients(res.data);
    };
    fetchProjects();
    fetchClients();
  }, []);

  return (
    <div className="font-sans">
      <LandingPageNavbar />
      <HeroSection />

      <div className="w-full p-6 md:p-12 bg-white">
        {/* Top Section */}

        <div className="flex flex-col md:flex-row items-center justify-between px-8">
          <div className="">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Not Your Average Realtor
            </h2>
            <p className="text-gray-500 mt-2">
              Built with creativity and passion, <br /> providing unmatched
              service with <br /> a touch of class.
            </p>
          </div>

          {/* Image Grid */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <div className="w-24 h-24 md:w-64 md:h-64 rounded-full overflow-hidden bg-gray-200">
              <img src={Ellipse11} alt="img" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200">
                <img src={Ellipse12} alt="img" />
              </div>
              <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200">
                <img src={Ellipse13} alt="img" />
              </div>
            </div>
          </div>
        </div>

        {/* <img className="z-10 relative -top-48" src={Ellipse7} alt="img" /> */}

        {/* Why Choose Us Section */}
        <div className="mt-12">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-center text-xl md:text-4xl font-semibold text-blue-900">
              Why Choose Us?
            </h3>
            <img className="w-full h-2" src={lineShape} alt="Line" />
          </div>
          <div className="flex flex-col md:flex-row justify-center mt-8 gap-8">
            {/* Feature Card 1 */}
            <div className="text-center max-w-sm flex flex-col gap-2">
              <div className="text-blue-600 mb-2 flex justify-center">
                <div className="bg-slate-100 flex justify-center py-2 rounded-full">
                  <img className="w-[70%]" src={iconHome} alt="img" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-blue-900">
                Potential ROI
              </h4>
              <p className="text-gray-500">
                Maximize your investment with our tailored approach to real
                estate.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="text-center max-w-sm flex flex-col gap-2">
              <div className="text-blue-600 mb-2 flex justify-center">
                <div className="bg-slate-100 flex justify-center py-2 rounded-full">
                  <img className="w-[70%]" src={iconPaintBrush} alt="img" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-blue-900">Design</h4>
              <p className="text-gray-500">
                A keen eye for design, helping you choose the perfect property.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="text-center max-w-sm flex flex-col gap-2">
              <div className="text-blue-600 mb-2 flex justify-center">
                <div className="bg-slate-100 flex justify-center py-2 rounded-full">
                  <img className="w-[70%]" src={iconDollar} alt="img" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-blue-900">Marketing</h4>
              <p className="text-gray-500">
                Expert marketing to give your property the visibility it
                deserves.
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="my-36 flex flex-col md:flex-row items-center md:justify-center gap-6">
          <div className="relative -top-14 w-40 h-32 md:w-40 md:h-24 bg-gray-200 rounded-lg">
            <img src={img1} alt="img" />
          </div>
          <div className="w-40 h-32 md:w-56 md:h-40 bg-gray-200 rounded-lg">
            <img src={img2} alt="img" />
          </div>
          <div className="relative top-20 w-40 h-32 md:w-40 md:h-26 bg-gray-200 rounded-lg">
            <img src={img3} alt="img" />
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-center text-xl md:text-4xl font-semibold text-blue-900">
              About Us
            </h3>
            <img className="w-full h-2" src={lineShape} alt="Line" />
          </div>

          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            We are a dedicated team with a passion for real estate and client
            satisfaction. We guide you through every step of the process,
            ensuring a seamless experience.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Learn More
          </button>
        </div>
      </div>

      <section>
        <div className="bg-slate-100 my-8 flex flex-col items-center py-12 gap-6">
          <div className="w-[60%] text-3xl text-blue-500 font-bold text-center">Our Projects</div>
          <div className="w-[60%] text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem earum nemo esse autem facere illum optio sapiente doloremque deleniti consequatur doloribus laudantium veritatis quaerat repudiandae, omnis excepturi temporibus ipsa nulla.</div>
          <CardSlider />
        </div>
      </section>

      <section>
        <div className="my-8 flex flex-col items-center py-12 gap-6">
          <div className="w-[60%] text-3xl text-blue-500 font-bold text-center">Happy Clients</div>
          <CardSliderClients />
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
}

export default LandingPage;
