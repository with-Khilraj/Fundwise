import React, { useState } from 'react';
import Modal from 'react-modal';
import './Hero.css';
import watch_img from '../../../assets/watch-icon.svg';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='hero'>
      <div className="hero-text">
        <h1> <span className='hero-text-color'> Happiness</span> comes from <span className='hero-text-color'>your action</span></h1>
        <p>Be a part of the breakthrough and make someone's dream come true.</p>
        <div className='hero-btn'>
          <Link to="/Allcampaign" className='btn-donate'>Donate now</Link>
          <button className='btn-watch' onClick={openModal}>
            <img src={watch_img} alt="btn-img" />Watch video
          </button>
        </div>
      </div>
  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Watch Video"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button className='modal-close-button' onClick={closeModal}>X</button>
        <div className="video-responsive">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xQXwIs0Eejo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}

export default Hero;
