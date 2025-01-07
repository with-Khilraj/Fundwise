import React from 'react';
import Select from 'react-select';
import './CampaignFilter.css';

const options = [
  { value: '', label: 'All Categories' },
  { value: 'category1', label: 'Business & StartUp' },
  { value: 'category2', label: 'Medical & Healing' },
  { value: 'category3', label: 'Causes & Charities' },
  // Add more categories as needed
];

const CampaignFilter = ({ onFilterChange, onSearch }) => {
  const handleCategoryChange = (selectedOption) => {
    onFilterChange('category', selectedOption.value);
  };

  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };

  return (
    <div className="campaign-filter">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={handleCategoryChange}
        classNamePrefix="react-select"
      />
      <button className="btn-search" onClick={onSearch}>Search</button>
    </div>
  );
};

export default CampaignFilter;
