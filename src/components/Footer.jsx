import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      <div className="container-max px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-font2 text-xl mb-4">The Ashbourne</h3>
            <p className="text-sm mb-4">
              A luxury colonial estate where heritage meets refined comfort. Timeless elegance since 1847.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-white transition">
                f
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition">
                📷
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition">
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#rooms" className="hover:text-white transition">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Accommodations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Room Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>The Crown Penthouse</li>
              <li>Grand Suites Collection</li>
              <li>Celestial Heights</li>
              <li>Regency Elegance</li>
              <li>Heritage Collection</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Phone:</strong> +1 (555) 123-4567
              </li>
              <li>
                <strong>Email:</strong> info@ashbourne.com
              </li>
              <li>
                <strong>Address:</strong> 123 Heritage Lane, Colonial Estate, CE 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-center md:text-left">
          <div>
            <p>© {currentYear} The Ashbourne. All rights reserved.</p>
          </div>
          <div className="flex justify-center md:justify-end gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
