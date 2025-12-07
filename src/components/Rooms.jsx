import React, { useState } from "react";

// Floor definitions with updated pricing and room counts
const floorDefinitions = [
  { floor: 8, name: "The Crown Penthouse", basePrice: 1500, roomCount: 2, description: "Ultimate luxury with panoramic views, private terraces, and exclusive amenities" },
  { floor: 7, name: "Grand Suites Collection", basePrice: 950, roomCount: 3, description: "Spacious suites with sitting areas, premium furnishings, and personalized service" },
  { floor: 6, name: "Celestial Heights", basePrice: 750, roomCount: 5, tag: "Premium", description: "Sky-view chambers with premium linens, spa-inspired bathrooms, and concierge" },
  { floor: 5, name: "Regency Elegance", basePrice: 550, roomCount: 6, description: "Classical elegance with period furnishings, state-of-the-art amenities, and views" },
  { floor: 4, name: "Clocktower Chambers", basePrice: 425, roomCount: 7, description: "Historic charm with contemporary comfort, heritage details, and intimate ambiance" },
  { floor: 3, name: "Heritage Collection", basePrice: 325, roomCount: 8, description: "Colonial-inspired rooms with authentic architectural details and timeless elegance" },
  { floor: 2, name: "Manor Rooms", basePrice: 225, roomCount: 8, description: "Comfortable and refined accommodations with distinguished style and warm hospitality" },
  { floor: 1, name: "Garden Retreat", basePrice: 150, roomCount: 8, description: "Ground-level serenity with garden views, natural light, and peaceful ambiance" },
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
        rooms.push({
          id: roomNumber,
          name: `${f.name} — ${side} Wing ${i}`,
          side,
          floor: f.floor,
          price: priceNum,
          priceLabel: `USD ${priceNum}/night`,
          description: `${f.name} room on the ${side.toLowerCase()} wing. Comfortable, elegant, and thoughtfully appointed.`,
          img: `https://source.unsplash.com/collection/483251/800x600?sig=${f.floor * 10 + i}`,
        });
      }
    });
    floors.push({ floor: f.floor, name: f.name, rooms, roomCount: f.roomCount });
  });
  return floors;
};

const floorsData = generateRooms();

const Rooms = ({ categoriesOnly = false, onRequestBooking }) => {
  const [priceFilter, setPriceFilter] = useState(2000);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const filteredFloors = !categoriesOnly
    ? floorsData.filter((floor) => {
        const minPrice = Math.min(...floor.rooms.map((r) => r.price));
        return minPrice <= priceFilter && (selectedFloor === null || floor.floor === selectedFloor);
      })
    : floorsData;
  return (
    <section id="rooms" className="container-max px-4 py-12">
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
                  <img src={floorBlock.rooms[0].img} alt={`${floorBlock.name} thumbnail`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
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
                                <img src={r.img} alt={r.name} className="w-28 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h5 id={`room-${r.id}`} className="font-font2 text-md text-mahogany">{r.name}</h5>
                                  <p className="text-sm text-color2">{r.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                      <span className="font-semibold">{r.priceLabel}</span>
                                      {onRequestBooking ? (
                                        <button onClick={() => onRequestBooking(floorBlock.name)} className="px-3 py-1 rounded text-white" style={{ backgroundColor: "var(--emerald)" }}>Book</button>
                                      ) : (
                                        <button className="px-3 py-1 rounded text-white" style={{ backgroundColor: "var(--emerald)" }}>Book</button>
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
