// src/components/CardSlider.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const CardSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data from internal API
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects'); // Replace with your actual internal API endpoint
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full px-4 py-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4.5 },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="bg-white rounded-lg shadow-lg p-4 text-center">
              <img
                src={`http://localhost:5000/${project.image}`}
                alt={project.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-blue-600 text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Read More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
