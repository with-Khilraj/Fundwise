import React, { useState, useEffect, useRef } from "react";
import CampaignCard from "../../Allcampaign_Component/CampaignCard/CampaignCard";
import Pagination from "../Pagination/Pagination";
import { fetchCampaigns } from '../../../api/campaigns';
import "./SectionContain.css";

const ITEMS_PER_PAGE = 3; // Display 3 items per row

const SectionContain = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardRefs = useRef([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    loadCampaigns();
  }, []);

  const totalPages = Math.ceil(campaigns.length / ITEMS_PER_PAGE);
  const currentCampaigns = campaigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const firstCardIndex = (page - 1) * ITEMS_PER_PAGE;
    const firstCardRef = cardRefs.current[firstCardIndex];
    if (firstCardRef) {
      firstCardRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="section-contain">
      <div className="card-container">
        {currentCampaigns.map((campaign, index) => (
          <div
            key={campaign._id}
            ref={(el) => (cardRefs.current[(currentPage - 1) * ITEMS_PER_PAGE + index] = el)}
          >
            <CampaignCard
              _id={campaign._id}
              image={campaign.image}
              title={campaign.title}
              story={campaign.story}
              raised={campaign.raised}
              goal={campaign.goal}
              topDonors={campaign.topDonors}
              comments={campaign.comments}
              daysLeft={campaign.daysLeft}
              donations={campaign.donations}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SectionContain;
