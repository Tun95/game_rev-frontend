import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <ul className="footer_list d_flex">
        <li>
          <Link to="/about" className="footer_link">
            {" "}
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="footer_link">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/disclaimer" className="footer_link">
            {" "}
            Disclaimer
          </Link>
        </li>
        <li>
          <Link to="/privacy-policy" className="footer_link">
            {" "}
            Privacy Policy
          </Link>
        </li>
      </ul>
      <div className="blank_space">
        <small>
          Developed By{" "}
          <a
            href="https://my-portfolio-app-7oam.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Olatunji Akande
          </a>
        </small>
      </div>
    </div>
  );
}

export default Footer;
