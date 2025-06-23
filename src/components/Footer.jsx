import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f1f1f1", color: "#333" }} className="pt-5 pb-4 shadow-sm">
      <div className="container">
        <div className="row">

          {/* Brand Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">About Shopvista</h5>
            <p>Shopvista is your ultimate destination for shopping top brands across India. Experience quality, style, and affordability all in one place.</p>
            <p><strong>Email:</strong> support@shopvista.in</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-decoration-none text-dark">About Us</a></li>
              <li><a href="/brands" className="text-decoration-none text-dark">Our Brands</a></li>
              <li><a href="/contact" className="text-decoration-none text-dark">Contact</a></li>
              <li><a href="/faq" className="text-decoration-none text-dark">FAQs</a></li>
              <li><a href="/terms" className="text-decoration-none text-dark">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Stay Connected</h5>
            <p>Follow us on social media to stay updated on deals & trends.</p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-dark fs-4"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-dark fs-4"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-dark fs-4"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-dark fs-4"><FaLinkedinIn /></a>
              <a href="mailto:support@shopvista.in" className="text-dark fs-4"><FaEnvelope /></a>
            </div>
          </div>

        </div>

        <hr className="mt-4" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} <strong>Shopvista</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
