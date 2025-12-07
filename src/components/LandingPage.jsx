import React from 'react';
import Rooms from '../components/Rooms';
import heroImage from '../assets/grand1.jpg'; // Using an existing image for the hero section

const LandingPage = ({ onNavigateToRooms, onRequestBooking }) => {
  return (
    <div className="bg-gray-50">
      {/* 1. Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] md:h-[80vh] text-white flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-font1 tracking-wider leading-tight">
            The Ashbourne
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light">
            Experience Unparalleled Luxury and Timeless Elegance.
          </p>
          <button
            onClick={onNavigateToRooms}
            className="mt-8 px-8 py-3 rounded-md font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "var(--emerald)" }}
          >
            Explore Our Rooms
          </button>
        </div>
      </section>

      {/* 2. Welcome Section */}
      <section className="py-16 px-4 container-max text-center">
        <h2 className="text-3xl md:text-4xl font-font2 text-mahogany mb-4">
          A Sanctuary of Sophistication
        </h2>
        <p className="max-w-3xl mx-auto text-color2 leading-relaxed">
          Nestled in the heart of the city, The Ashbourne stands as a beacon of luxury and refined comfort. Our historic landmark has been meticulously restored to blend classical elegance with modern amenities, offering a unique and unforgettable stay for discerning travelers. Discover a world where every detail is crafted for your comfort.
        </p>
      </section>

      {/* 3. Room Categories Preview */}
      <section className="bg-white py-16">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-font2 text-mahogany mb-2">Our Accommodations</h2>
            <p className="text-color2">Select a category to discover your perfect retreat.</p>
          </div>
          {/* Using the existing Rooms component to show categories */}
          <Rooms categoriesOnly={true} onRequestBooking={onRequestBooking} />
        </div>
      </section>

      {/* 4. Amenities Section */}
      <section className="py-16 px-4 container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-font2 text-mahogany mb-2">Signature Amenities</h2>
          <p className="text-color2">Designed for an extraordinary stay.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-mahogany mb-2">Gourmet Dining</h3>
            <p className="text-color2">Exquisite flavors from our award-winning chefs.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-mahogany mb-2">Rooftop Pool</h3>
            <p className="text-color2">Relax and unwind with stunning city views.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-mahogany mb-2">Wellness Spa</h3>
            <p className="text-color2">A serene escape for rejuvenation and tranquility.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-mahogany mb-2">Concierge Service</h3>
            <p className="text-color2">Personalized assistance to curate your perfect visit.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;