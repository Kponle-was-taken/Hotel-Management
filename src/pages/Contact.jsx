import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact The Ashbourne - Get in Touch";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Contact The Ashbourne luxury hotel. Reach our team for reservations, inquiries, or special requests. Available 24/7 for your convenience.');
  }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const errs = {};
    const { name, email, phone, subject, message } = values;
    if (!name || name.trim().length < 2) errs.name = "Please enter your name.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) errs.email = "Enter a valid email address.";
    if (!phone || phone.trim().length < 5) errs.phone = "Enter a valid phone number.";
    if (!subject || subject.trim().length < 3) errs.subject = "Please enter a subject.";
    if (!message || message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="fixed top-0 left-0 w-full z-30">
          <Navbar />
        </div>
        <div className="pt-32 pb-12 px-4">
          <div className="container-max">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-font2 text-mahogany mb-4">
                Contact The Ashbourne
              </h1>
              <p className="text-xl text-color2 font-font1">
                We'd love to hear from you. Reach out with any questions or special requests.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "var(--emerald)" }}
                  >
                    📍
                  </div>
                  <h3 className="text-lg font-font2 text-mahogany">Address</h3>
                </div>
                <p className="text-color2">
                  123 Heritage Lane<br />
                  Colonial Estate, CE 12345<br />
                  United States
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "var(--emerald)" }}
                  >
                    📞
                  </div>
                  <h3 className="text-lg font-font2 text-mahogany">Phone</h3>
                </div>
                <p className="text-color2">
                  Main: +1 (555) 123-4567<br />
                  Reservations: +1 (555) 123-4568<br />
                  Concierge: +1 (555) 123-4569
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "var(--emerald)" }}
                  >
                    ✉️
                  </div>
                  <h3 className="text-lg font-font2 text-mahogany">Email</h3>
                </div>
                <p className="text-color2">
                  General: info@ashbourne.com<br />
                  Reservations: book@ashbourne.com<br />
                  Events: events@ashbourne.com
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-12">
              <h2 className="text-2xl font-font2 text-mahogany mb-4">Hours of Operation</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-mahogany">Reception Desk</p>
                  <p className="text-color2">Available 24/7</p>
                </div>
                <div>
                  <p className="font-semibold text-mahogany">Fine Dining Restaurant</p>
                  <p className="text-color2">Dinner: 6:00 PM - 11:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold text-mahogany">Breakfast Service</p>
                  <p className="text-color2">6:30 AM - 11:00 AM (Daily)</p>
                </div>
                <div>
                  <p className="font-semibold text-mahogany">Heritage Spa</p>
                  <p className="text-color2">9:00 AM - 9:00 PM (Daily)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-font2 text-mahogany mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Thank you for your message! We'll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700 mb-2">Name *</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`p-3 border rounded-md focus:outline-none ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="text-red-600 text-sm mt-1">{errors.name}</span>}
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700 mb-2">Email *</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`p-3 border rounded-md focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="text-red-600 text-sm mt-1">{errors.email}</span>}
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700 mb-2">Phone *</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className={`p-3 border rounded-md focus:outline-none ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <span className="text-red-600 text-sm mt-1">{errors.phone}</span>}
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700 mb-2">Subject *</span>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className={`p-3 border rounded-md focus:outline-none ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && <span className="text-red-600 text-sm mt-1">{errors.subject}</span>}
                  </label>
                </div>

                <label className="flex flex-col mb-6">
                  <span className="text-sm font-semibold text-gray-700 mb-2">Message *</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className={`p-3 border rounded-md focus:outline-none resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your message here..."
                  />
                  {errors.message && <span className="text-red-600 text-sm mt-1">{errors.message}</span>}
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-md font-semibold text-white"
                  style={{ backgroundColor: "var(--emerald)" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
