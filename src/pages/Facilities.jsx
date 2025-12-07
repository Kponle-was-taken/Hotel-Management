import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

const Facilities = () => {
  useEffect(() => {
    document.title = "Facilities & Amenities - The Ashbourne Luxury Hotel";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore The Ashbourne amenities including heritage spa, fine dining, infinity pool, fitness center, and more. Experience world-class facilities designed for your comfort.');
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </div>
      <div className="pt-24">
        {/* Hero Section */}
        <div
          className="bg-linear-to-b from-mahogany to-gray-900 text-white py-16 px-4"
        >
          <div className="container-max">
            <h1 className="text-4xl md:text-5xl font-font2 mb-4">
              Facilities & Amenities
            </h1>
            <p className="text-xl max-w-2xl">
              Discover our world-class amenities designed to elevate every moment of your stay at The Ashbourne.
            </p>
          </div>
        </div>

        {/* Amenities Section */}
        <Amenities />

        {/* Gallery Section */}
        <Gallery />
      </div>
      <Footer />
    </>
  );
};

export default Facilities;
