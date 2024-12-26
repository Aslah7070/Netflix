import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f text-white hover:text-gray-300"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram text-white hover:text-gray-300"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter text-white hover:text-gray-300"></i>
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fab fa-youtube text-white hover:text-gray-300"></i>
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
          <a href="#" className="hover:text-white">Audio Description</a>
          <a href="#" className="hover:text-white">Help Centre</a>
          <a href="#" className="hover:text-white">Gift Cards</a>
          <a href="#" className="hover:text-white">Media Centre</a>
          <a href="#" className="hover:text-white">Investor Relations</a>
          <a href="#" className="hover:text-white">Jobs</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Legal Notices</a>
          <a href="#" className="hover:text-white">Cookie Preferences</a>
          <a href="#" className="hover:text-white">Corporate Information</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>

        {/* Service Code */}
        <div className="text-center my-4">
          <button className="border border-gray-400 text-gray-400 px-4 py-2 hover:bg-gray-700">
            Service Code
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm mt-4">
          © 1997-2024 Netflix, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
