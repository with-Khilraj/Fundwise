// campaignController.js
// const Campaign = require('../models/Campaign');

// exports.createCampaign = async (req, res) => {
//   try {
//     const { title, story, goal, endDate, imageUrl } = req.body;
//     const campaign = new Campaign({ title, story, goal, endDate, imageUrl });
//     await campaign.save();
//     res.status(201).json(campaign);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating campaign', error });
//   }
// };

// exports.getCampaigns = async (req, res) => {
//   try {
//     const campaigns = await Campaign.find().populate('createdBy', 'name email');
//     res.status(200).json(campaigns);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching campaigns', error });
//   }
// };

// // for admin show
// exports.getCampaignsByUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const campaigns = await Campaign.find({ createdBy: userId }).populate('createdBy', 'name email');
//     res.status(200).json(campaigns);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching campaigns', error });
//   }
// };
const fs = require('fs');
const path = require('path');
const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
  try {
    const { title, story, goal, endDate } = req.body;
    const image = req.file ? req.file.path : '';
    const campaign = new Campaign({ title, story, goal, endDate, image, createdBy: req.user._id });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'firsrName');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};

exports.getCampaignsByUser = async (req, res) => {
  try {
    const userId = req.user; // Use the authenticated user's ID from the middleware
    const campaigns = await Campaign.find({ createdBy: userId }).populate('createdBy', 'firstName');
    res.status(200).json({ campaigns });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};

exports.updateRaisedAmount = async (req, res) => {
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
};

exports.updateTopDonors = async (req, res) => {
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
};

exports.addComment = async (req, res) => {
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

    res.status(201).json(campaign.comments); // Ensure comments are returned as an array
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id).select('comments');
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    res.json(campaign.comments); // Ensure comments are returned as an array
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status500().json({ msg: 'Server error' });
  }
};

//admin delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndDelete(id);
    if (campaign.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', campaign.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image file: ${imagePath}`, err);
        } else {
          console.log(`Deleted image file: ${imagePath}`);
        }
      });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// fetching the user donation in admin
exports.getAllDonations = async (req, res) => {
  try {
    console.log("Fetching all donations");
    const campaigns = await Campaign.find().populate('createdBy');
    console.log("Campaigns found:", campaigns.length);
    const donations = campaigns.reduce((acc, campaign) => {
      campaign.donations.forEach(donation => {
        acc.push({
          campaignTitle: campaign.title,
          campaignImage: campaign.image,
          donorName: donation.user,
          amount: donation.amount,
          date: donation.date,
          donationId: donation._id,
          campaignId: campaign._id
        });
      });
      return acc;
    }, []);
    console.log("Total donations found:", donations.length);
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Error fetching donations', error });
  }
};


exports.deleteDonation = async (req, res) => {
  try {
    const { campaignId, donationId } = req.params;
    console.log(`Attempting to delete donation with ID: ${donationId} from campaign ID: ${campaignId}`);

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      console.error('Campaign not found');
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const donationIndex = campaign.donations.findIndex(d => d._id.toString() === donationId);
    if (donationIndex === -1) {
      console.error('Donation not found');
      return res.status(404).json({ message: 'Donation not found' });
    }

    campaign.donations.splice(donationIndex, 1);
    await campaign.save();

    console.log('Donation deleted successfully');
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// New function to get total donations, total campaigns, and total donors
exports.getDashboardInsights = async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    const totalDonations = await Campaign.aggregate([
      { $unwind: "$donations" },
      { $group: { _id: null, total: { $sum: "$donations.amount" } } }
    ]);
    const totalDonors = await Campaign.aggregate([
      { $unwind: "$donations" },
      { $group: { _id: "$donations.user" } },
      { $count: "totalDonors" }
    ]);
    const totalDonationAmount = totalDonations[0] ? totalDonations[0].total : 0;
    const totalDonorCount = totalDonors[0] ? totalDonors[0].totalDonors : 0;

    res.status(200).json({
      totalCampaigns,
      totalDonationAmount,
      totalDonorCount
    });
  } catch (error) {
    console.error('Error fetching dashboard insights:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

//Mycampaign
exports.updateCampaign = async (req, res) => {
  try {
    const { title, story, goal, endDate } = req.body;
    const campaignData = { title, story, goal, endDate };

    if (req.file) {
      campaignData.image = req.file.path;
    }

    const campaign = await Campaign.findByIdAndUpdate(req.params.id, campaignData, { new: true });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ message: 'Error updating campaign', error: error.message });
  }
};