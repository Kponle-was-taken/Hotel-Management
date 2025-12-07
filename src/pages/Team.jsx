import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Team = () => {
  useEffect(() => {
    document.title = "Our Team - The Ashbourne Luxury Hotel Staff";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Meet The Ashbourne team of hospitality professionals dedicated to providing exceptional service. Learn about our management, chefs, and support staff.');
  }, []);
  const teamMembers = [
    {
      id: 1,
      name: "Victoria Ashton",
      title: "General Manager",
      bio: "With 25 years of luxury hospitality experience across Europe and Asia, Victoria leads The Ashbourne with vision and dedication to excellence. Her passion for service is reflected in every guest interaction.",
      expertise: ["Strategic Leadership", "Guest Relations", "Operations"],
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "James Blackwood",
      title: "Executive Chef",
      bio: "A Michelin-trained chef with a passion for colonial cuisine reimagined. James sources the finest local ingredients and creates menus that celebrate heritage and innovation.",
      expertise: ["Fine Dining", "Menu Design", "Culinary Innovation"],
      avatar: "👨‍🍳",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "Spa Director",
      bio: "Elena brings 20 years of wellness expertise and a deep knowledge of holistic therapies. She curates bespoke spa experiences that rejuvenate body and mind.",
      expertise: ["Wellness", "Therapies", "Guest Wellness Planning"],
      avatar: "👩‍⚕️",
    },
    {
      id: 4,
      name: "Marcus Chen",
      title: "Concierge Manager",
      bio: "Marcus is the heart of The Ashbourne's hospitality. Available 24/7, he transforms guest requests into unforgettable experiences with his extensive local knowledge.",
      expertise: ["Guest Services", "Event Planning", "Local Expertise"],
      avatar: "👨‍💼",
    },
    {
      id: 5,
      name: "Sophie Laurent",
      title: "Head Housekeeper",
      bio: "Sophie oversees every detail of our rooms and facilities with meticulous attention. Her team ensures that every guest enjoys the highest standards of comfort and cleanliness.",
      expertise: ["Quality Standards", "Team Management", "Guest Comfort"],
      avatar: "👩‍🦱",
    },
    {
      id: 6,
      name: "David Patel",
      title: "Director of Guest Experience",
      bio: "David's innovative approach to personalized service ensures every guest feels uniquely valued. His team goes above and beyond to create memorable moments.",
      expertise: ["Guest Experience", "Personalization", "Service Excellence"],
      avatar: "👨‍💻",
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </div>
      <div className="pt-24">
        {/* Hero Section */}
        <div className="bg-linear-to-b from-mahogany to-gray-900 text-white py-16 px-4">
          <div className="container-max">
            <h1 className="text-4xl md:text-5xl font-font2 mb-4">
              Our Exceptional Team
            </h1>
            <p className="text-xl max-w-2xl">
              Meet the dedicated professionals who make The Ashbourne an unforgettable destination. Each team member is committed to delivering excellence in every interaction.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="container-max px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Avatar Background */}
                <div
                  className="h-32 flex items-center justify-center text-7xl"
                  style={{ backgroundColor: "var(--emerald)" }}
                >
                  {member.avatar}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-font2 text-mahogany mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-emerald mb-4">
                    {member.title}
                  </p>
                  <p className="text-color2 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: "var(--emerald)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Philosophy Section */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-font2 text-mahogany mb-6">
              Our Team Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-font2 text-mahogany mb-3">
                  Passion for Excellence
                </h3>
                <p className="text-color2">
                  Every team member is dedicated to surpassing expectations and delivering exceptional service that creates lasting memories.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-font2 text-mahogany mb-3">
                  Continuous Learning
                </h3>
                <p className="text-color2">
                  We invest in our team's professional development, ensuring they bring the latest hospitality expertise to every guest interaction.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-font2 text-mahogany mb-3">
                  Guest-Centric Mindset
                </h3>
                <p className="text-color2">
                  At the heart of everything we do is a commitment to understanding and exceeding each guest's unique needs and desires.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-font2 text-mahogany mb-4">
              Experience Our Team's Dedication
            </h2>
            <p className="text-lg text-color2 mb-6">
              Join us at The Ashbourne and discover hospitality at its finest.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 rounded-md font-semibold text-white"
              style={{ backgroundColor: "var(--emerald)" }}
            >
              Book Your Stay
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
