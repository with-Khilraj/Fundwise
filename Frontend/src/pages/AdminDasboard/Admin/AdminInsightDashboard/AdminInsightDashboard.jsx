import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminInsightDashboard.css';

// Register the necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const AdminInsightDashboard = () => {
  const [insights, setInsights] = useState({
    totalCampaigns: 0,
    totalDonationAmount: 0,
    totalDonorCount: 0,
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5500/api/campaigns/insights', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching insights:', error.response ? error.response.data : error.message);
        toast.error('Error fetching insights');
      }
    };

    fetchInsights();
  }, []);

  const data = {
    labels: ['Total Donations', 'Total Donors', 'Total Campaigns'],
    datasets: [
      {
        label: 'Insights',
        data: [insights.totalDonationAmount, insights.totalDonorCount, insights.totalCampaigns],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard Insights</h2>
      <div className="card-container">
        <div className="card primary-card">
          <div className="card-content">
            <h3>Total Donations</h3>
            <p>{insights.totalDonationAmount}</p>
          </div>
        </div>
        <div className="card warning-card">
          <div className="card-content">
            <h3>Total Donors</h3>
            <p>{insights.totalDonorCount}</p>
          </div>
        </div>
        <div className="card success-card">
          <div className="card-content">
            <h3>Total Campaigns</h3>
            <p>{insights.totalCampaigns}</p>
          </div>
        </div>
      </div>
      <div className="chart">
        <Line data={data} />
      </div>
    </div>
  );
};

export default AdminInsightDashboard;
