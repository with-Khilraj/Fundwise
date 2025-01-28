// const express = require('express');
// const router = express.Router();
// const Campaign = require('../models/Campaign'); // Adjust the path as needed

// // Create a campaign
// router.post('/create', async (req, res) => {
//   const { title, story, goal, endDate } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';

//   if (!title || !story || !goal || !endDate || !image) {
//     return res.status(400).json({ msg: 'All fields are required' });
//   }

//   try {
//     const campaign = new Campaign({ title, story, goal, endDate, image });
//     await campaign.save();
//     res.status(201).json(campaign);
//   } catch (error) {
//     console.error('Error creating campaign:', error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Fetch all campaigns
// router.get('/', async (req, res) => {
//   try {
//     const campaigns = await Campaign.find();
//     res.json(campaigns);
//   } catch (error) {
//     console.error('Error fetching campaigns:', error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Update the top donors
// router.patch('/top-donors/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { donors } = req.body;

//     const campaign = await Campaign.findById(id);
//     if (!campaign) {
//       return res.status(404).json({ msg: 'Campaign not found' });
//     }

//     campaign.topDonors = donors;
//     await campaign.save();

//     res.status(200).json(campaign);
//   } catch (err) {
//     console.error('Error updating top donors:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');
const { getCampaignsByUser } = require('../controllers/campaignController');


// Calculate days left
const calculateDaysLeft = (endDate) => {
  const endDateObj = new Date(endDate);
  const currentDate = new Date();
  return Math.ceil((endDateObj - currentDate) / (1000 * 60 * 60 * 24));
};

// Create a campaign
router.post('/create', authMiddleware, async (req, res) => {
  const { title, story, goal, endDate } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  if (!title || !story || !goal || !endDate || !image) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const campaign = new Campaign({ 
      title, 
      story, 
      goal, 
      endDate, 
      image,
      createdBy: req.user
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'firstName');
    const campaignsWithDaysLeft = campaigns.map(campaign => ({
      ...campaign.toObject(),
      daysLeft: calculateDaysLeft(campaign.endDate)
    }));
    res.json(campaignsWithDaysLeft);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update the raised amount
router.patch('/raise/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    campaign.raised += amount;
    await campaign.save();

    res.status(200).json(campaign);
  } catch (err) {
    console.error('Error updating raised amount:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update the top donors
router.patch('/top-donors/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { donors } = req.body;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    campaign.topDonors = donors.split(',').map(donor => donor.trim());
    await campaign.save();

    res.status(200).json(campaign);
  } catch (err) {
    console.error('Error updating top donors:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add comment to a campaign
router.post('/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    const newComment = { user, text, date: new Date() };
    campaign.comments.push(newComment);
    await campaign.save();

    res.status(201).json(campaign.comments);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch comments for a campaign
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id).select('comments');
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    res.json(campaign.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

//mycampaign endpoint
router.get('/mine', authMiddleware, getCampaignsByUser);

// router.get('/:id', getCampaignById);




// Show campaigns by user
router.get('/user/:userId', authMiddleware, campaignController.getCampaignsByUser);

// Add DELETE route for campaign
router.delete('/:id', authMiddleware, campaignController.deleteCampaign);

// Admin endpoint for user donations
router.get('/donations', authMiddleware, campaignController.getAllDonations);
router.delete('/donations/:campaignId/:donationId', authMiddleware, campaignController.deleteDonation);

// New route for dashboard insights
router.get('/insights', authMiddleware, campaignController.getDashboardInsights);

module.exports = router;
