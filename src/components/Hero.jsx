import React from "react";
import banner from "../assets/colonial.jpg";
import Navbar from "./Navbar";

const Hero = () => {

  return (
    <>
      <div
        className="relative h-screen bg-cover bg-center md:m-2"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* subtle dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.55)]"></div>

        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-font2 tracking-tight leading-tight">
              The Ashbourne
            </h1>
            <p className="mt-4 text-sm md:text-lg opacity-90">
              A luxury colonial estate where heritage meets refined comfort.
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <a
                href="/rooms"
                className="px-6 py-3 rounded-md font-semibold"
                style={{ backgroundColor: "var(--antique-gold)", color: "var(--white)"  }}
                aria-label="Explore rooms and suites"
              >
                Explore
              </a>

              <a
                href="#about"
                className="px-6 py-3 rounded-md border-2 font-semibold"
                style={{ borderColor: "rgba(255,255,255,0.75)", color: "white" }}
                aria-label="Learn more"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Booking modal triggered from Rooms page now */}
    </>
  );
};

export default Hero;
