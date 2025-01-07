import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>What is Fundwise?</h3>
        <p>Fundwise is a crowdfunding platform that empowers individuals, businesses, and organizations to raise funds for their projects, ideas, or causes.</p>
      </div>
      <div className="footer-section">
        <h3>Company</h3>
        <ul>
         <Link to= "/Aboutus"><li>About</li></Link> 
          <Link to="/Contact"><li>Contact</li></Link>
          <li>Careers</li>
          <li>Team members</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Resource</h3>
        <ul>
          
          <Link to= "/FAQ"><li>FAQs</li></Link>
          <li>Terms of service</li>
          <li>Terms of service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Community</h3>
        <ul>
          <li>Support desk</li>
          <li>Blog</li>
          <li>Forum</li>
          <li>Membership</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
