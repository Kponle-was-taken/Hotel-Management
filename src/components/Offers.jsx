import React, { useState } from "react";

const Offers = ({ compact = false }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Holiday Escape Package",
      description: "Perfect for festive celebrations",
      discount: "25% OFF",
      originalPrice: "$3,500",
      newPrice: "$2,625",
      nights: "3 nights",
      includes: [
        "Luxury room upgrade",
        "Champagne welcome",
        "Spa credit ($200)",
        "Fine dining discount (20%)",
        "Late checkout",
      ],
      period: "Dec 15 - Jan 5",
      badge: "Featured",
    },
    {
      id: 2,
      title: "Romantic Getaway",
      description: "Celebrate love and togetherness",
      discount: "20% OFF",
      originalPrice: "$2,400",
      newPrice: "$1,920",
      nights: "2 nights",
      includes: [
        "Suite accommodation",
        "Couples spa treatment",
        "Romantic dinner",
        "Rose petals & champagne",
        "Sunrise breakfast in bed",
      ],
      period: "Year-round",
      badge: "Popular",
    },
    {
      id: 3,
      title: "Extended Stay Discount",
      description: "Stay longer, save more",
      discount: "30% OFF",
      originalPrice: "$4,200",
      newPrice: "$2,940",
      nights: "7 nights",
      includes: [
        "Weekly room rate",
        "Housekeeping included",
        "Fitness center access",
        "Free WiFi & parking",
        "Flexible check-out",
      ],
      period: "Available year-round",
      badge: "Best Value",
    },
    {
      id: 4,
      title: "Wellness Retreat",
      description: "Rejuvenate your mind & body",
      discount: "15% OFF",
      originalPrice: "$3,000",
      newPrice: "$2,550",
      nights: "3 nights",
      includes: [
        "Heritage spa package",
        "Yoga & meditation classes",
        "Wellness meals",
        "Personal trainer session",
        "Relaxation room access",
      ],
      period: "Year-round",
      badge: "Wellness",
    },
    {
      id: 5,
      title: "Business Traveler Package",
      description: "Work in luxury and style",
      discount: "20% OFF",
      originalPrice: "$1,800",
      newPrice: "$1,440",
      nights: "4 nights",
      includes: [
        "Business suite",
        "Free high-speed WiFi",
        "Meeting room credits",
        "Business center access",
        "Executive breakfast",
      ],
      period: "Mon-Fri bookings",
      badge: "Corporate",
    },
    {
      id: 6,
      title: "Penthouse Dream",
      description: "Experience ultimate luxury",
      discount: "10% OFF",
      originalPrice: "$6,000",
      newPrice: "$5,400",
      nights: "3 nights",
      includes: [
        "Crown Penthouse suite",
        "Private concierge service",
        "Premium spa treatments",
        "Gourmet dining experiences",
        "Helicopter tour option",
      ],
      period: "Available year-round",
      badge: "Luxury",
    },
  ];

  if (compact) {
    const compactList = offers.slice(0, 3);
    return (
      <section id="offers" className="py-12 bg-white">
        <div className="container-max px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-font2 text-mahogany mb-2">Special Offers</h2>
            <p className="text-sm text-color2 max-w-xl mx-auto">Selected seasonal packages curated for your stay. Visit Offers for full details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {compactList.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-3">
                  <h3 className="text-lg font-font2 text-mahogany">{offer.title}</h3>
                  <span className="text-sm font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: 'var(--emerald)' }}>{offer.discount}</span>
                </div>
                <p className="text-sm text-color2 mb-3">{offer.description}</p>
                <div className="mt-auto w-full flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-mahogany">{offer.newPrice}</div>
                    <div className="text-xs text-gray-400 line-through">{offer.originalPrice}</div>
                  </div>
                  <a href="#offers" className="px-3 py-1 rounded bg-(--emerald) text-white text-sm">View Offer</a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/" className="px-6 py-2 rounded-md font-semibold text-white" style={{ backgroundColor: 'var(--emerald)' }}>
              View All Offers
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="offers" className="py-16 bg-white">
      <div className="container-max px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-font2 text-mahogany mb-4">
            Special Offers & Packages
          </h2>
          <p className="text-lg text-color2 max-w-2xl mx-auto">
            Discover our exclusive deals and packages designed to enhance your stay at The Ashbourne.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative bg-linear-to-br from-gray-50 to-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-mahogany group cursor-pointer"
              onClick={() => setSelectedOffer(selectedOffer?.id === offer.id ? null : offer)}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "var(--emerald)" }}>
                {offer.badge}
              </div>

              {/* Discount Banner */}
              <div className="bg-linear-to-r from-mahogany to-amber-800 text-white p-4 text-center">
                <div className="text-3xl font-bold">{offer.discount}</div>
                <p className="text-sm">Limited time offer</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-font2 text-mahogany mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-color2 mb-4">{offer.description}</p>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-mahogany">
                      {offer.newPrice}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {offer.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-color2">For {offer.nights}</p>
                </div>

                {/* Period */}
                <p className="text-xs text-gray-500 mb-4 italic">Valid: {offer.period}</p>

                {/* CTA Button */}
                <button
                  className="w-full py-2 rounded-md font-semibold text-white transition-all"
                  style={{ backgroundColor: "var(--emerald)" }}
                >
                  Book This Offer
                </button>

                {/* Expandable Details */}
                {selectedOffer?.id === offer.id && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="font-semibold text-mahogany mb-3">What's Included:</p>
                    <ul className="space-y-2">
                      {offer.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-color2">
                          <span className="text-green-500 font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Terms Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-font2 text-mahogany mb-4">Terms & Conditions</h3>
          <ul className="text-sm text-color2 space-y-2">
            <li>✓ All offers are subject to availability and cannot be combined with other promotions</li>
            <li>✓ Bookings must be made directly through our website or by contacting our reservations team</li>
            <li>✓ Cancellations must be made 7 days prior to arrival for full refund</li>
            <li>✓ Prices are per room per night in USD and include taxes</li>
            <li>✓ Additional supplements may apply for peak seasons or special events</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Offers;
