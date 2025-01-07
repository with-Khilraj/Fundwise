import React from 'react';
import './FAQ.css';
import generalQuestionImage from '../../assets/general-question.png';
import documentationImage from '../../assets/documentation.png';
import supportDeskImage from '../../assets/support-desk.png';
import contactUsImage from '../../assets/contact-us.png';
import { Link } from 'react-router-dom';

const FAQ = () => {
    return (
      <div className="faq-container">
        <header className="faq-header">
          <div className="header-content">
            <div className="header-text">
              <h1>The answers for your question</h1>
              <p>Here is a collection of frequently asked questions from users</p>
              <button className="faq-button">Ask a question</button>
            </div>
            <img src={generalQuestionImage} alt="General questions" className="header-image"/>
          </div>
        </header>
        <main className="faq-main">
          <section className="faq-section">
            <h2>General question</h2>
            <ul>
              <li>
                <h3>Unsubscribe or Update email Notification Settings</h3>
                <p>
                  Hate inbox clutter as much as you do. You can easily choose when you get an email from us by visiting Unsubscribe after logging into your account. You can also manage your email settings, or unsubscribe, from the links at the bottom of the latest received email.
                </p>
              </li>
              <li>
                <h3>How to Report Content</h3>
              </li>
              <li>
                <h3>I forgot my password. What do I do?</h3>
              </li>
            </ul>
          </section>
          <section className="faq-section">
            <h2>My account</h2>
            <ul>
              <li>
                <h3>How do I reactivate my account?</h3>
                <p>
                  Simply access the website and sign another petition using the email address associated with your account. If you’ve received a message that you need to contact us when attempting to log in or you’re having any other problems with reopening your account, please click on the “Contact Support”.
                </p>
              </li>
              <li>
                <h3>How to edit your petition</h3>
              </li>
              <li>
                <h3>How to edit account and profile information</h3>
              </li>
              <li>
                <h3>I forgot my password. What do I do?</h3>
              </li>
              <li>
                <h3>How do I close my account?</h3>
              </li>
            </ul>
          </section>
          <section className="faq-additional">
            <div className="additional-section">
              <img src={documentationImage} alt="Documentation" className="faq-image"/>
              <h3>Documentation</h3>
              <p>Find documents related to products and your account.</p>
              <button className="faq-button">Find a tutorial</button>
            </div>
            <div className="additional-section">
              <img src={supportDeskImage} alt="Support Desk" className="faq-image"/>
              <h3>Support Desk</h3>
              <p>Contact our technical experts for customer support.</p>
              <button className="faq-button">Create a ticket</button>
            </div>
          </section>
          <section className="faq-contact">
            <img src={contactUsImage} alt="Contact us" className="faq-image"/>
            <h2>No question I need here?</h2>
            <p>Can’t find the question you need, contact us for your new question.</p>
            <Link to="/Contact" className="faq-button">Contact us</Link>
          </section>
        </main>
      </div>
    );
  }
  

export default FAQ;
