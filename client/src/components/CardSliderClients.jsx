// src/components/CardSliderClients.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const CardSliderClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch clients data from internal API
    const fetchClients = async () => {
      try {
        const response = await fetch('https://fullsatck-project-by-vineet-suman-server.onrender.com/api/clients'); // Replace with your actual internal API endpoint
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="w-full px-4 py-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
      >
        {clients.map((client) => (
          <SwiperSlide key={client.id}>
            <div className="bg-white rounded-lg p-6" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }}>
              <div className="flex justify-center mb-4">
                <img
                  src={`https://fullsatck-project-by-vineet-suman-server.onrender.com/${client.image}`}
                  alt={client.name}
                  className="w-20 h-20 object-cover rounded-full border-4"
                />
              </div>
              <p className="text-gray-600 my-4">{client.description}</p>
              <h3 className="text-blue-600 text-xl font-semibold mb-1">{client.name}</h3>
              <p className="text-gray-500 text-sm">{client.designation}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSliderClients;
