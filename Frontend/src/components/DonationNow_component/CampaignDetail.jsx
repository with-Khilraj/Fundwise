import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KhaltiCheckout from 'khalti-checkout-web';
import { fetchComments, postComment } from '../../api/campaigns';
import { useUser } from '../Context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CampaignDetail.css';

const CampaignDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { campaign } = location.state;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentUser, setCommentUser] = useState('');
  const [activeTab, setActiveTab] = useState('story');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetchComments(campaign._id);
        setComments(Array.isArray(response) ? response : []); // Ensure comments is always an array
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    loadComments();
  }, [campaign._id]);

  if (!campaign) {
    return <p>No campaign data found.</p>;
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;
  const imageUrl = campaign.image ? `http://localhost:5500${campaign.image}` : campaign.imageUrl;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postComment(campaign._id, {
        user: commentUser,
        text: commentText,
      });
      setComments(Array.isArray(response) ? response : []); // Ensure comments is always an array
      setCommentUser('');
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const khaltiConfig = {
    publicKey: 'test_public_key_2ed75e202edf4b969ab40bf82671890b',
    productIdentity: campaign._id,
    productName: campaign.title,
    productUrl: window.location.href,
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
        handleDonation(payload.token);
      },
      onError(error) {
        console.error(error);
        toast.error('Payment error');
      },
      onClose() {
        console.log('Khalti widget is closing');
      },
    },
  };

  const khaltiCheckout = new KhaltiCheckout(khaltiConfig);

  const handleDonateNow = () => {
    if (!user) {
      navigate('/'); // Redirect to home page if user is not logged in
      toast.error('Please log in to donate');
      return;
    }
    setShowDonateModal(true);
  };

  const handleDonation = async (token) => {
    try {
      const response = await axios.post('http://localhost:5500/api/payment/verify-payment', {
        token,
        amount: parseInt(donationAmount, 10) * 100, // Ensure the amount is in paisa
        user: user.firstName,
      });
      if (response.data.success) {
        // Update the campaign raised amount
        const updatedCampaign = response.data.updatedCampaign;
        campaign.raised = updatedCampaign.raised;
        campaign.donations = updatedCampaign.donations; // Update donations list
        setShowDonateModal(false);
        setDonationAmount('');
        toast.success('Payment successfully made!');
      } else {
        console.error('Payment not completed:', response.data.message);
        toast.error('Payment not completed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('Payment verification error');
    }
  };

  const handleShare = (platform) => {
    const shareData = {
      title: campaign.title,
      text: campaign.story,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      let shareUrl;
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(campaign.title + ': ' + campaign.story)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(campaign.title + ': ' + campaign.story)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(campaign.title)}&summary=${encodeURIComponent(campaign.story)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(campaign.title + ': ' + campaign.story + ' ' + window.location.href)}`;
          break;
        default:
          return;
      }
      window.open(shareUrl, '_blank');
    }
    setShowShareModal(false);
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return <p>{campaign.description || campaign.story}</p>;
      case 'comments':
        return (
          <div className="comments-section">
            <h2>Comments</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.user}</strong>: {comment.text}
                </li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={commentUser}
                    onChange={(e) => setCommentUser(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Comment:
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button type="submit">Submit Comment</button>
            </form>
          </div>
        );
      case 'update':
        return <p>No updates available.</p>;

      case 'donors':
        return (
          <div className="donors-section">
            <h2>Donors</h2>
            <ul>
              {campaign.donations.map((donation) => (
                <li key={donation._id}>
                  <div className="donor-info">
                    <div className="donor-avatar">{donation.user[0]}</div>
                    <div className="donor-details">
                      <span className="donor-name">{donation.user}</span>
                      <span className="donor-date">Donated on {new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="donor-amount">
                    <strong>Rs {donation.amount.toLocaleString()}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="campaign-detail-container">
      <h1 className="campaign-title">{campaign.title}</h1>
      <div className="campaign-content">
        <div className="campaign-left">
          <img src={imageUrl} alt={campaign.title} className="campaign-image" />
        </div>
        <div className="campaign-right">
          <button className="donate-button" onClick={handleDonateNow}>
            Donate Now
          </button>
          <button className="share-button" onClick={() => setShowShareModal(true)}>
            Share
          </button>
          <div className="campaign-stats">
            <p className="raised-amount">Rs {campaign.raised.toLocaleString()}</p>
            <p className="goal-amount">Raised of Rs {campaign.goal.toLocaleString()} goal</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="supporters">{campaign.donations.length} Supporters</p> {/* Ensure donations is an array */}
            <p className="days-left">{campaign.daysLeft} days left</p>
          </div>
          <div className="top-donators">
            <h3>Top Donors</h3>
            <ul>
              {campaign.donations
                .sort((a, b) => b.amount - a.amount) // Sort donations by amount in descending order
                .slice(0, 3) // Get top 3 donations
                .map((donation, index) => (
                  <li key={index} className="donor-box">
                    <div className="donor-info">
                      <div className="donor-avatar">{donation.user[0]}</div>
                      <div className="donor-details">
                        <span className="donor-name">{donation.user}</span>
                        <span className="donor-date">Donated on {new Date(donation.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="donor-amount">
                      <strong>Rs {donation.amount.toLocaleString()}</strong>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="campaign-story">
        <div className="tabs">
          <span
            className={`tab ${activeTab === 'story' ? 'active' : ''}`}
            onClick={() => setActiveTab('story')}
          >
            Story
          </span>
          <span
            className={`tab ${activeTab === 'update' ? 'active' : ''}`}
            onClick={() => setActiveTab('update')}
          >
            Update
          </span>
          <span
            className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            Comments
          </span>
          <span
            className={`tab ${activeTab === 'donors' ? 'active' : ''}`}
            onClick={() => setActiveTab('donors')}
          >
            Donors
          </span>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>

      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-content-donation" onClick={(e) => e.stopPropagation()}>
            <h2>Share this campaign</h2>
            <button className="modal-share-button" onClick={() => handleShare('facebook')}>Share on Facebook</button>
            <button className="modal-share-button" onClick={() => handleShare('twitter')}>Share on Twitter</button>
            <button className="modal-share-button" onClick={() => handleShare('linkedin')}>Share on LinkedIn</button>
            <button className="modal-share-button" onClick={() => handleShare('whatsapp')}>Share on WhatsApp</button>
            
          </div>
        </div>
      )}

      {showDonateModal && (
        <div className="modal-overlay" onClick={() => setShowDonateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Donate to {campaign.title}</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="donation-input"
            />
            <button
              className="donation-submit-button"
              onClick={() => khaltiCheckout.show({ amount: parseInt(donationAmount, 10) * 100 })} // Ensure the amount is in paisa
            >
              Donate via Khalti
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetail;


