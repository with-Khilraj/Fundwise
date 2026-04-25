const campaignService = require('./campaign.service');

exports.createCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.createCampaign(req.body, req.user._id, req.file?.path);
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Fetch campaigns error:', error);
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};

exports.getCampaignsByUser = async (req, res) => {
  try {
    const campaigns = await campaignService.getCampaignsByUser(req.user._id);
    res.status(200).json({ campaigns });
  } catch (error) {
    console.error('Fetch user campaigns error:', error);
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};

exports.updateRaisedAmount = async (req, res) => {
  try {
    const campaign = await campaignService.updateRaisedAmount(req.params.id, req.body.amount);
    res.status(200).json(campaign);
  } catch (error) {
    console.error('Update raised amount error:', error);
    res.status(400).json({ msg: error.message });
  }
};

exports.updateTopDonors = async (req, res) => {
  try {
    const campaign = await campaignService.updateTopDonors(req.params.id, req.body.donors);
    res.status(200).json(campaign);
  } catch (error) {
    console.error('Update top donors error:', error);
    res.status(400).json({ msg: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { user, text } = req.body;
    const comments = await campaignService.addComment(req.params.id, user, text);
    res.status(201).json(comments);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(400).json({ msg: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await campaignService.getComments(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const result = await campaignService.deleteCampaign(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await campaignService.getAllDonations();
    res.status(200).json(donations);
  } catch (error) {
    console.error('Get all donations error:', error);
    res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const { campaignId, donationId } = req.params;
    await campaignService.deleteDonation(campaignId, donationId);
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardInsights = async (req, res) => {
  try {
    const insights = await campaignService.getDashboardInsights();
    res.status(200).json(insights);
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.updateCampaign(req.params.id, req.body, req.file?.path);
    res.status(200).json(campaign);
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ message: error.message });
  }
};
