import React, { useState } from "react";
import './StartCampaign.css';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../Context/UserContext'; // Correctly import the useUser hook
import StartFundImage from '../../../assets/StartFundImage.png'; // Add the illustration image
import LoginModal from "../../Login/LoginModal"; // Correct import path

const StartCampaign = () => {

  const navigate = useNavigate();
  const { user } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleStartCampaign = () => {
    if (user) {
      navigate('/create-campaign');
    } else {
      setModalOpen(true);
    }
  };

  

  return (
    <div className="start-campaign">
      <div className="content">
        <h2>Start one today!</h2>
        <p>People everywhere are empowered to start campaigns, mobilize supporters, and work with Decision Makers to drive solutions.</p>
        <button onClick={handleStartCampaign} className="start-campaign-button">Start a campaign</button>
        <LoginModal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
      <div className="illustration">
        <img src={StartFundImage} alt="Illustration" />
      </div>
    </div>
  );
};

export default StartCampaign;
