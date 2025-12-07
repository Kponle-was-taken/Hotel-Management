import React, { useState } from "react";
import pent1 from "/src/assets/pent1.jpg";
import pent2 from "/src/assets/pent2.jpg";
import grand1 from "/src/assets/grand1.jpg";
import grand2 from "/src/assets/grand2.jpg";
import grand3 from "/src/assets/grand3.jpg";
import cele1 from "/src/assets/cele1.jpg";
import cele2 from "/src/assets/cele2.jpg";
import cele3 from "/src/assets/cele3.jpg";
import cele4 from "/src/assets/cele4.jpg";
import cele5 from "/src/assets/cele5.jpg";

// Floor definitions with updated pricing and room counts
const floorDefinitions = [
  {
    floor: 8, name: "The Crown Penthouse", basePrice: 1500, roomCount: 2, description: "Ultimate luxury with panoramic views, private terraces, and exclusive amenities",
    // Add specific images for the penthouse rooms
    images: [
      pent1,
      pent2
    ],
    details: {
      beds: "2 King Beds",
      kitchen: "Full gourmet kitchen with private chef on request",
      bathroom: "Two en-suite marble bathrooms with jacuzzis and rain showers",
      features: ["Private rooftop terrace", "Panoramic city views", "Personal butler service"]
    }
  },
  {
    floor: 7, name: "Grand Suites Collection", basePrice: 950, roomCount: 3, description: "Spacious suites with sitting areas, premium furnishings, and personalized service",
    images: [
      grand1,
      grand2,
      grand3
    ],
    details: {
      beds: "1 King Bed or 2 Queen Beds",
      kitchen: "Kitchenette with minibar and espresso machine",
      bathroom: "Large bathroom with dual vanities and soaking tub",
      features: ["Separate living area", "Personalized concierge service", "High-floor city views"]
    }
  },
  {
    floor: 6, name: "Celestial Heights", basePrice: 750, roomCount: 5, tag: "Premium", description: "Sky-view chambers with premium linens, spa-inspired bathrooms, and concierge",
    images: [
      cele1,
      cele2,
      cele3,
      cele4,
      cele5
    ],
    details: {
      beds: "1 King Bed",
      kitchen: "N/A",
      bathroom: "Spa-inspired bathroom with rainfall shower",
      features: ["Premium linens", "Sky-view windows", "Access to Celestial Lounge"]
    }
  },
  {
    floor: 5, name: "Regency Elegance", basePrice: 550, roomCount: 6, description: "Classical elegance with period furnishings, state-of-the-art amenities, and views",
    details: {
      beds: "1 Queen Bed",
      kitchen: "N/A",
      bathroom: "Classic bathroom with vintage fittings",
      features: ["Period furnishings", "State-of-the-art TV and sound system", "City or courtyard views"]
    }
  },
  {
    floor: 4, name: "Clocktower Chambers", basePrice: 425, roomCount: 7, description: "Historic charm with contemporary comfort, heritage details, and intimate ambiance",
    details: {
      beds: "1 Queen Bed",
      kitchen: "N/A",
      bathroom: "Modern bathroom with walk-in shower",
      features: ["Heritage architectural details", "Intimate and cozy ambiance", "Soundproofed windows"]
    }
  },
  {
    floor: 3, name: "Heritage Collection", basePrice: 325, roomCount: 8, description: "Colonial-inspired rooms with authentic architectural details and timeless elegance",
    details: { beds: "1 Double Bed", kitchen: "N/A", bathroom: "Standard bathroom", features: ["Colonial-inspired decor", "Authentic architectural details"] }
  },
  {
    floor: 2, name: "Manor Rooms", basePrice: 225, roomCount: 8, description: "Comfortable and refined accommodations with distinguished style and warm hospitality",
    details: { beds: "2 Twin Beds or 1 Double Bed", kitchen: "N/A", bathroom: "Standard bathroom", features: ["Distinguished, classic style", "Warm and inviting atmosphere"] }
  },
  {
    floor: 1, name: "Garden Retreat", basePrice: 150, roomCount: 8, description: "Ground-level serenity with garden views, natural light, and peaceful ambiance",
    details: { beds: "1 Double Bed", kitchen: "N/A", bathroom: "Standard bathroom with shower", features: ["Direct garden access or views", "Abundant natural light"] }
  },
];

// Generate rooms per floor based on individual room counts
const generateRooms = () => {
  const floors = [];
  floorDefinitions.forEach((f) => {
    const rooms = [];
    const roomsPerSide = Math.ceil(f.roomCount / 2);
    const sides = ["West", "East"];
    
    sides.forEach((side, sideIndex) => {
      const sideCount = sideIndex === 0 ? roomsPerSide : f.roomCount - roomsPerSide;
      for (let i = 1; i <= sideCount; i++) {
        const roomNumber = `${f.floor}${side[0]}${i.toString().padStart(2, "0")}`; // e.g. 6W01
        const priceNum = Math.round(f.basePrice + (i - 1) * 15); // variance within floor
        const roomIndex = sideIndex * roomsPerSide + i - 1;
        const details = f.details;
        rooms.push({
          id: roomNumber,
          name: `${f.name} — ${side} Wing ${i}`,
          side,
          floor: f.floor,
          price: priceNum,
          priceLabel: `USD ${priceNum}/night`,
          description: f.description,
          img: f.images?.[roomIndex] || `https://source.unsplash.com/collection/483251/800x600?sig=${f.floor * 10 + i}`,
          details,
          isAvailable: true, // All rooms are available initially
        });
      }
    });
    floors.push({ floor: f.floor, name: f.name, rooms, roomCount: f.roomCount });
  });
  return floors;
};

const Rooms = ({ categoriesOnly = false, onRequestBooking }) => {
  const [floorsData, setFloorsData] = useState(() => generateRooms());
  const [priceFilter, setPriceFilter] = useState(2000);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [previewImage, setPreviewImage] = useState({ src: null, x: 0, y: 0 });
  const [modalRoom, setModalRoom] = useState(null);

  // Handler to update room availability
  const handleBooking = (bookedRoom) => {
    if (onRequestBooking) {
      onRequestBooking(bookedRoom);
    }

    // Update the state to mark the room as unavailable
    setFloorsData(currentFloors =>
      currentFloors.map(floor => ({
        ...floor,
        rooms: floor.rooms.map(room =>
          room.id === bookedRoom.id ? { ...room, isAvailable: false } : room
        ),
      }))
    );
    setModalRoom(null); // Close the modal
  };

  const filteredFloors = !categoriesOnly
    ? floorsData.filter((floor) => {
        const minPrice = Math.min(...floor.rooms.map((r) => r.price));
        return minPrice <= priceFilter && (selectedFloor === null || floor.floor === selectedFloor);
      })
    : floorsData;
  return (
    <section id="rooms" className="container-max px-4 py-12 relative">
      {/* Hover Image Preview */}
      {previewImage.src && (
        // This container will act as a modal on small screens
        <div className="hidden md:block fixed inset-auto z-50 pointer-events-none">
          <img
            src={previewImage.src}
            alt="Preview"
            // On small screens, it's a large centered image. On medium+, it's a smaller image that follows the cursor.
            className="w-[200px] h-auto object-contain rounded-lg shadow-2xl md:w-[300px]"
            style={{
              left: `${previewImage.x + 15}px`,
              top: `${previewImage.y + 15}px`,
            }}
          />
        </div>
      )}
      {/* Room Details Modal */}
      {modalRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setModalRoom(null)}>
          <article className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={modalRoom.img} alt={modalRoom.name} className="w-full h-64 object-cover rounded-t-lg" />
              <button onClick={() => setModalRoom(null)} className="absolute top-3 right-3 bg-white rounded-full p-2 leading-none text-xl">&times;</button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-font2 text-mahogany mb-2">{modalRoom.name}</h3>
              <p className="text-color2 mb-4">{modalRoom.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-mahogany block">Beds:</strong>
                  <span>{modalRoom.details.beds}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-mahogany block">Bathroom:</strong>
                  <span>{modalRoom.details.bathroom}</span>
                </div>
                {modalRoom.details.kitchen !== "N/A" && (
                  <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
                    <strong className="text-mahogany block">Kitchen:</strong>
                    <span>{modalRoom.details.kitchen}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <strong className="text-mahogany block mb-2">Key Features:</strong>
                <ul className="list-disc list-inside text-color2 space-y-1">
                  {modalRoom.details.features.map((feature, i) => <li key={i}>{feature}</li>)}
                </ul>
              </div>

              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-b-lg -m-6 mt-6">
                <span className="font-semibold text-lg">{modalRoom.priceLabel}</span>
                <button
                  onClick={() => handleBooking(modalRoom)}
                  disabled={!modalRoom.isAvailable}
                  className="px-6 py-2 rounded-md font-semibold text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style={{ backgroundColor: modalRoom.isAvailable ? "var(--emerald)" : undefined }}>
                  Book Now
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-font2 mb-2">Rooms & Suites</h2>
      </div>
      {categoriesOnly ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {floorsData.map((floorBlock) => {
            const prices = floorBlock.rooms.map((r) => r.price);
            const minPrice = Math.min(...prices);
            const floorDef = floorDefinitions.find(f => f.floor === floorBlock.floor);
            return (
              <article key={floorBlock.floor} className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={floorBlock.rooms[0].img}
                    alt={`${floorBlock.name} thumbnail`}
                    onMouseEnter={(e) => setPreviewImage({ src: floorBlock.rooms[0].img, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setPreviewImage({ src: null, x: 0, y: 0 })}
                    onMouseMove={(e) => setPreviewImage(p => ({ ...p, x: e.clientX, y: e.clientY }))}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {floorDef && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <p className="text-white text-center px-4 text-sm font-medium">{floorDef.description}</p>
                    </div>
                  )}
                </div>
                  <div className="p-4">
                    <h3 className="text-lg font-font2 text-mahogany">{floorBlock.name}</h3>
                    <p className="text-sm text-color2 mb-3">{floorBlock.roomCount} rooms {floorBlock.roomCount <= 5 ? "— exclusive" : "— available"}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">From USD {minPrice}/night</span>
                      {onRequestBooking ? (
                        <button onClick={() => onRequestBooking(floorBlock.name)} className="px-4 py-2 rounded-md font-semibold text-white" style={{ backgroundColor: "var(--emerald)" }}>
                          Explore
                        </button>
                      ) : (
                        <a href="#rooms" className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: "var(--emerald)", color: "white" }}>
                          Explore
                        </a>
                      )}
                    </div>
                  </div>
              </article>
            );
          })}
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-mahogany mb-3">
                  Max Price: USD {priceFilter}/night
                </label>
                <input
                  type="range"
                  min="150"
                  max="2000"
                  step="50"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--emerald) 0%, var(--emerald) ${((priceFilter - 150) / (2000 - 150)) * 100}%, #e5e7eb ${((priceFilter - 150) / (2000 - 150)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-mahogany mb-3">
                  Filter by Floor Category
                </label>
                <select
                  value={selectedFloor || ""}
                  onChange={(e) => setSelectedFloor(e.target.value ? Number(e.target.value) : null)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Floors</option>
                  {floorDefinitions.map((floor) => (
                    <option key={floor.floor} value={floor.floor}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-10">
            {filteredFloors.map((floorBlock) => (
              <div key={floorBlock.floor} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="text-xl font-font2 text-mahogany">{floorBlock.name}</h3>
                  <p className="text-sm text-color2">Floor {floorBlock.floor} — {floorBlock.roomCount} rooms {floorBlock.roomCount <= 5 ? "— exclusive collection" : ""}</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* West / East columns */}
                    {["West", "East"].map((side) => (
                      <div key={side}>
                        <h4 className="font-semibold mb-2">{side} Wing</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {floorBlock.rooms
                            .filter((r) => r.side === side)
                            .map((r) => (
                              <article key={r.id} className="flex gap-3 items-center p-3 rounded border" aria-labelledby={`room-${r.id}`}>
                                <img
                                  src={r.img} alt={r.name}
                                  className="w-28 h-20 object-cover rounded"
                                  onMouseEnter={(e) => setPreviewImage({ src: r.img, x: e.clientX, y: e.clientY })}
                                  onMouseLeave={() => setPreviewImage({ src: null, x: 0, y: 0 })}
                                  onMouseMove={(e) => setPreviewImage(p => ({ ...p, x: e.clientX, y: e.clientY }))}
                                />
                                <div className="flex-1">
                                  <h5 id={`room-${r.id}`} className="font-font2 text-md text-mahogany">{r.name}</h5>
                                  <p className="text-sm text-color2">{r.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                      <span className="font-semibold">{r.priceLabel}</span>
                                      {onRequestBooking ? (
                                        <button onClick={() => setModalRoom(r)} disabled={!r.isAvailable} className="px-3 py-1 rounded text-white disabled:bg-gray-400" style={{ backgroundColor: r.isAvailable ? "var(--emerald)" : undefined }}>
                                          {r.isAvailable ? "Explore" : "Booked"}
                                        </button>
                                      ) : (
                                        <button onClick={() => setModalRoom(r)} className="px-3 py-1 rounded text-white" style={{ backgroundColor: "var(--emerald)" }}>Explore</button>
                                      )}
                                    </div>
                                </div>
                              </article>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {filteredFloors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-color2">No rooms match your filters. Try adjusting your criteria.</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Rooms;
