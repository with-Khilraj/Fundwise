
import axios from 'axios';

const API_URL = 'http://localhost:5500/api/campaigns';

export const createCampaign = async (campaignData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/create`, campaignData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const updateRaisedAmount = async (campaignId, amount) => {
  try {
    const response = await axios.patch(`${API_URL}/raise/${campaignId}`, { amount });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const fetchComments = async (campaignId) => {
  try {
    const response = await axios.get(`${API_URL}/${campaignId}/comments`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const postComment = async (campaignId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/${campaignId}/comment`, commentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
//delete campaign from admin
export const deleteCampaign = async (campaignId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(`${API_URL}/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};