import React from "react";
import contactImage from "../../../assets/Contact.png";
import "./ContactImage.css";

const ContactImage = () => {
    return (
      <div className="contact-image">
        <img src={contactImage} alt="Contact Us" />
      </div>
    );
  }

export default ContactImage;
