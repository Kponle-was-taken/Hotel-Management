import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Margaret Thompson",
      role: "Heritage Enthusiast",
      text: "The Ashbourne is a masterpiece. Every detail whispers of elegance and history. A truly transformative experience.",
      rating: 5,
    },
    {
      id: 2,
      name: "James Wellington",
      role: "Business Executive",
      text: "Impeccable service, stunning architecture, and unparalleled attention to detail. This is luxury redefined.",
      rating: 5,
    },
    {
      id: 3,
      name: "Eleanor Davies",
      role: "Travel Connoisseur",
      text: "A sanctuary of refinement. The Ashbourne captured my heart with its timeless charm and warm hospitality.",
      rating: 5,
    },
    {
      id: 4,
      name: "Richard Blackwell",
      role: "Art Collector",
      text: "The aesthetics, the comfort, the service—everything is curated to perfection. Exceptional in every way.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-max px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-font2 text-color mb-4">
            Cherished Memories
          </h2>
          <p className="text-lg text-gray-600">
            Words from those who've experienced The Ashbourne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-linear-to-br from-[#FAF8F3] to-[#F5EBDD] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="md:text-gray-700 text-black mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-gray-300 pt-4">
                <p className="font-semibold text-color">{testimonial.name}</p>
                <p className="text-sm  text-black ">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
