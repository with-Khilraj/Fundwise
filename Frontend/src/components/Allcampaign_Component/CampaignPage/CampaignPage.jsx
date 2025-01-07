import React, { useState, useEffect } from 'react';
import CampaignFilter from '../ShowCompaign/CampaignFilter';
import CampaignCard from '../CampaignCard/CampaignCard';
import CampaignPagination from '../CampaignPagination/CampaignPagination';
import { fetchCampaigns } from '../../../api/campaigns';
import './CampaignPage.css';

const CampaignPage = () => {
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 12;

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data); // Initialize filtered campaigns
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    loadCampaigns();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    const filtered = campaigns.filter(campaign => {
      const searchMatch = campaign.title.toLowerCase().includes(filters.search.toLowerCase()) || campaign.story.toLowerCase().includes(filters.search.toLowerCase());
      const categoryMatch = filters.category === '' || campaign.category === filters.category;
      return searchMatch && categoryMatch;
    });
    setFilteredCampaigns(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = filteredCampaigns.length ? Math.ceil(filteredCampaigns.length / campaignsPerPage) : 1;

  const currentDate = new Date();
  const updatedCampaigns = filteredCampaigns.map(campaign => {
    const endDate = new Date(campaign.endDate);
    const daysLeft = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
    return { ...campaign, daysLeft };
  });

  return (
    <div className="campaign-page">
      <CampaignFilter onFilterChange={handleFilterChange} onSearch={handleSearch} />
      <div className="campaign-cards">
        {Array.isArray(updatedCampaigns) && updatedCampaigns.length > 0 ? (
          updatedCampaigns.slice((currentPage - 1) * campaignsPerPage, currentPage * campaignsPerPage).map((campaign) => (
            <CampaignCard key={campaign._id} {...campaign} />
          ))
        ) : (
          <p>No campaigns available.</p>
        )}
      </div>
      <CampaignPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CampaignPage;
