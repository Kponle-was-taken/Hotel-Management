import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Offers from "../components/Offers";
import Amenities from "../components/Amenities";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    // Set SEO metadata for home page
    document.title = "The Ashbourne - Luxury Colonial Hotel | Book Your Stay";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Experience timeless elegance at The Ashbourne, a luxury colonial hotel offering exquisite rooms, fine dining, spa, and world-class amenities. Book your unforgettable stay today.');
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', 'luxury hotel, colonial hotel, fine dining, spa, rooms and suites, wellness retreat');
  }, []);
  return (
    <>
      <Hero />
      <div className="text-center py-8 container-max px-4">
        <h1 className="text-l md:text-5xl py-5 font-font2">——— WELCOME TO THE ASHBOURNE ———</h1>
        <p className="text-md md:text-2xl px-4 md:px-0 pb-10 font-font1 text-color2">
          Step back in time to experience colonial elegance, bespoke service,
          and genuine tranquility. Find true comfort in timeless style. Your
          luxurious escape begins now.
        </p>
      </div>
      <div className="text-center py-6">
        <a href="/rooms" className="px-8 py-3 rounded-md font-semibold text-white" style={{ backgroundColor: "var(--emerald)" }}>
          Explore Rooms &amp; Suites
        </a>
      </div>
      <Offers compact={true} />
      <Amenities />
      <Testimonials />
      <Gallery />
      <Footer />
    </>
  );
};

export default Home;
