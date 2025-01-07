import React from "react";
import "./ContactInfo.css";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h1>Hello, What’s up?</h1>
      <p>Fundwise build with the Powerful Platform base on react with latest technology. We offers the fastest way for Webmaster start their Platforms.</p>
      <ul>
        <li>
          <i className="fas fa-map-marker-alt"></i> Address: Lalitpur, Imadol
        </li>
        <li>
          <i className="fas fa-envelope"></i> Email: info@fundwise.com
        </li>
        <li>
          <i className="fas fa-phone"></i> Phone numbers: +977 9814141235
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
