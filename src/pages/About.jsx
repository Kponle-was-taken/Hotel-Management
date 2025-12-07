import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    document.title = "About The Ashbourne - Heritage & Luxury Hotel";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Discover the heritage and philosophy of The Ashbourne, a historic luxury colonial hotel established in 1847 with world-class amenities and personalized service.');
  }, []);
  return (
    <>
      <Hero />
      <div className="container-max px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-font2 text-mahogany mb-4">
              About The Ashbourne
            </h1>
            <p className="text-xl text-color2 font-font1">
              A Legacy of Elegance and Refined Hospitality
            </p>
          </div>

          {/* History Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-font2 text-mahogany mb-4">Our Heritage</h2>
            <p className="text-lg text-color2 mb-4 leading-relaxed">
              The Ashbourne stands as a testament to colonial grandeur, beautifully preserved and thoughtfully reimagined for the modern traveler. Built in 1847, this magnificent estate has welcomed dignitaries, artists, and discerning guests from around the world, each leaving their mark on its storied halls.
            </p>
            <p className="text-lg text-color2 mb-4 leading-relaxed">
              For over 175 years, The Ashbourne has remained a beacon of luxury hospitality, its architecture reflecting the craftsmanship and vision of a bygone era while its service embodies contemporary excellence. Every stone, every room, every graceful corridor tells a story of elegance and refinement.
            </p>
          </section>

          {/* Philosophy Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-font2 text-mahogany mb-4">Our Philosophy</h2>
            <p className="text-lg text-color2 mb-4 leading-relaxed">
              We believe that luxury is not merely about opulence—it is about the art of hospitality. At The Ashbourne, we understand that every guest arrives with their own story, their own desires, and their own expectations. Our commitment is to exceed them all.
            </p>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-font2 text-mahogany mb-3">Timeless Elegance</h3>
                <p className="text-color2">
                  We honor the past while embracing the present, creating an environment where history and comfort coexist beautifully.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-font2 text-mahogany mb-3">Personalized Service</h3>
                <p className="text-color2">
                  Every detail matters. Our team anticipates your needs and goes beyond to ensure your stay is extraordinary.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-font2 text-mahogany mb-3">Genuine Comfort</h3>
                <p className="text-color2">
                  Luxury should feel natural, not contrived. We create spaces where you can truly relax and be yourself.
                </p>
              </div>
            </div>
          </section>

          {/* Facilities Highlight */}
          <section className="mb-12">
            <h2 className="text-3xl font-font2 text-mahogany mb-4">What Makes Us Special</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "var(--emerald)", color: "white" }}>
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-mahogany">Eight Distinct Floors</h3>
                  <p className="text-color2">From our intimate Garden Retreat to our exclusive Crown Penthouse, each floor offers a unique experience tailored to your preferences.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "var(--emerald)", color: "white" }}>
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-mahogany">Award-Winning Dining</h3>
                  <p className="text-color2">Our restaurant celebrates colonial cuisine reimagined with contemporary techniques and the finest local ingredients.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "var(--emerald)", color: "white" }}>
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-mahogany">Heritage Spa</h3>
                  <p className="text-color2">Indulge in our world-class spa featuring treatments inspired by colonial wellness traditions and modern luxury therapies.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "var(--emerald)", color: "white" }}>
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-mahogany">Curated Experiences</h3>
                  <p className="text-color2">From guided estate tours to bespoke cultural excursions, we create unforgettable memories beyond the room.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 border-t">
            <h2 className="text-3xl font-font2 text-mahogany mb-4">Ready to Experience The Ashbourne?</h2>
            <p className="text-lg text-color2 mb-6">
              Begin your journey into timeless luxury and colonial elegance.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 rounded-md font-semibold text-white"
              style={{ backgroundColor: "var(--emerald)" }}
            >
              Book Your Stay
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
