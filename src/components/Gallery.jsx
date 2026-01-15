import React, { useState } from "react";
import pent1 from "/src/assets/pent1.jpg";
import dining from "../assets/fine dining.jpg";
import spa from "../assets/spa.jpg";
import pool from "../assets/infinity pool.jpg";
import ballroom from "../assets/ballroom.jpg";
import garden from "../assets/garden.jpg";
import regency from "../assets/regency suite.jpg";
import breakfast from "../assets/breakfast.jpg";
import library from "../assets/library.jpg";
 
const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Crown Penthouse Suite",
      category: "rooms",
      image: pent1,
      description: "Luxury penthouse with panoramic views",
    },
    {
      id: 2,
      title: "Fine Dining Restaurant",
      category: "dining",
      image: dining,
      description: "Award-winning culinary experience",
    },
    {
      id: 3,
      title: "Heritage Spa",
      category: "spa",
      image: spa,
      description: "Relaxation and rejuvenation",
    },
    {
      id: 4,
      title: "Infinity Pool",
      category: "facilities",
      image: pool,
      description: "Heated pool with panoramic views",
    },
    {
      id: 5,
      title: "Grand Ballroom",
      category: "events",
      image: ballroom,
      description: "Perfect for celebrations and events",
    },
    {
      id: 6,
      title: "Heritage Garden",
      category: "grounds",
      image: garden,
      description: "Beautifully landscaped grounds",
    },
    {
      id: 7,
      title: "Regency Suite",
      category: "rooms",
      image: regency,
      description: "Elegant accommodation with period details",
    },
    {
      id: 8,
      title: "Breakfast Terrace",
      category: "dining",
      image: breakfast,
      description: "Morning dining with garden views",
    },
    {
      id: 9,
      title: "Library Lounge",
      category: "common",
      image: library,
      description: "Quiet retreat with historic charm",
    },
  ];

  const categories = ["all", "rooms", "dining", "spa", "facilities", "events", "grounds", "common"];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container-max px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-font2 text-mahogany mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-color2 max-w-2xl mx-auto">
            Explore the beauty and elegance of The Ashbourne through our curated collection of images.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                selectedCategory === category
                  ? "text-white"
                  : "bg-white border border-gray-300 text-mahogany hover:border-mahogany"
              }`}
              style={
                selectedCategory === category
                  ? { backgroundColor: "var(--emerald)" }
                  : {}
              }
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-font2 text-lg">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-100 z-10"
                  aria-label="Close gallery"
                >
                  ✕
                </button>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-96 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-font2 text-mahogany mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-color2">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
