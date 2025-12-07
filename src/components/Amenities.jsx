import React from "react";

const Amenities = () => {
  const amenities = [
    {
      id: 1,
      name: "Heritage Spa",
      description: "Indulge in world-class spa treatments combining colonial wellness traditions with modern luxury therapies. Our expert therapists offer bespoke treatments tailored to your needs.",
      icon: "🧖",
      features: ["Massage therapy", "Facials & skincare", "Body treatments", "Wellness consultations"]
    },
    {
      id: 2,
      name: "Fine Dining Restaurant",
      description: "Experience culinary excellence in our award-winning restaurant. Colonial cuisine reimagined with contemporary techniques and locally-sourced ingredients.",
      icon: "🍽️",
      features: ["À la carte dining", "Private tasting menus", "Wine pairing selection", "Room service 24/7"]
    },
    {
      id: 3,
      name: "State-of-the-Art Fitness Center",
      description: "Stay active with our modern fitness facility featuring premium equipment, personal training, and group classes in an elegant historic setting.",
      icon: "💪",
      features: ["Cardio & strength training", "Personal trainers", "Group fitness classes", "Yoga studio"]
    },
    {
      id: 4,
      name: "Infinity Pool & Terrace",
      description: "Relax poolside with panoramic views overlooking the estates. Our heated infinity pool features cabanas, tropical landscaping, and poolside dining.",
      icon: "🏊",
      features: ["Heated infinity pool", "Private cabanas", "Poolside bar", "Lounging areas"]
    },
    {
      id: 5,
      name: "Concierge Services",
      description: "Our dedicated concierge team is available 24/7 to arrange dining reservations, transportation, cultural excursions, and fulfill special requests.",
      icon: "🎩",
      features: ["Restaurant reservations", "Transportation", "Tour arrangements", "Event planning"]
    },
    {
      id: 6,
      name: "Business Center & Meeting Spaces",
      description: "Conduct business with elegance in our fully-equipped conference rooms and business lounge featuring high-speed internet and professional services.",
      icon: "💼",
      features: ["Meeting rooms", "High-speed WiFi", "Business equipment", "Catering services"]
    },
    {
      id: 7,
      name: "Library & Lounge",
      description: "Escape to our curated library featuring rare colonial-era texts and modern literature. An ideal space for quiet contemplation and social gatherings.",
      icon: "📚",
      features: ["Extensive book collection", "Fireplace lounge", "Reading nooks", "Private events space"]
    },
    {
      id: 8,
      name: "Scenic Gardens & Grounds",
      description: "Explore our beautifully landscaped estates with guided tours. Discover heritage gardens, walking paths, and peaceful outdoor retreats.",
      icon: "🌳",
      features: ["Guided estate tours", "Heritage gardens", "Walking paths", "Picnic areas"]
    },
  ];

  return (
    <section id="amenities" className="bg-gray-50 py-16">
      <div className="container-max px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-font2 text-mahogany mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-black  max-w-2xl mx-auto">
            Discover the perfect blend of historic charm and contemporary luxury. Every amenity is designed to enhance your stay.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
            >
              <div className="text-5xl mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-font2 text-mahogany mb-2">{amenity.name}</h3>
              <p className="text-sm text-white mb-4 grow">{amenity.description}</p>
              <ul className="text-xs text-color2 space-y-1">
                {amenity.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white mt-0.5"
                      style={{ backgroundColor: "var(--emerald)" }}
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-color2 mb-6">
            Ready to experience our exceptional amenities?
          </p>
          <a
            href="/rooms"
            className="inline-block px-8 py-3 rounded-md font-semibold text-white"
            style={{ backgroundColor: "var(--emerald)" }}
          >
            Book Your Stay Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
