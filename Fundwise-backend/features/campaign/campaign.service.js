const Campaign = require('./campaign.model');
const fs = require('fs');
const path = require('path');

class CampaignService {
  async createCampaign(data, userId, filePath) {
    const { title, story, goal, endDate } = data;
    const campaign = new Campaign({
      title,
      story,
      goal,
      endDate,
      image: filePath || '',
      createdBy: userId
    });
    return await campaign.save();
  }

  async getCampaigns() {
    const campaigns = await Campaign.find().populate('createdBy', 'firstName');
    return campaigns.map(campaign => ({
      ...campaign.toObject(),
      daysLeft: this.calculateDaysLeft(campaign.endDate)
    }));
  }

  async getCampaignsByUser(userId) {
    return await Campaign.find({ createdBy: userId }).populate('createdBy', 'firstName');
  }

  async updateRaisedAmount(id, amount) {
    const campaign = await Campaign.findById(id);
    if (!campaign) throw new Error('Campaign not found');
    campaign.raised += amount;
    return await campaign.save();
  }

  async updateTopDonors(id, donorsString) {
    const campaign = await Campaign.findById(id);
    if (!campaign) throw new Error('Campaign not found');
    campaign.topDonors = donorsString.split(',').map(donor => donor.trim());
    return await campaign.save();
  }

  async addComment(id, user, text) {
    const campaign = await Campaign.findById(id);
    if (!campaign) throw new Error('Campaign not found');
    const newComment = { user, text, date: new Date() };
    campaign.comments.push(newComment);
    await campaign.save();
    return campaign.comments;
  }

  async getComments(id) {
    const campaign = await Campaign.findById(id).select('comments');
    if (!campaign) throw new Error('Campaign not found');
    return campaign.comments;
  }

  async deleteCampaign(id) {
    const campaign = await Campaign.findByIdAndDelete(id);
    if (!campaign) throw new Error('Campaign not found');
    
    if (campaign.image) {
      const imagePath = path.resolve(campaign.image); // Ensure absolute path
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Error deleting image file: ${imagePath}`, err);
      });
    }
    return { message: 'Campaign deleted successfully' };
  }

  async getAllDonations() {
    const campaigns = await Campaign.find().populate('createdBy');
    return campaigns.reduce((acc, campaign) => {
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
  }

  async deleteDonation(campaignId, donationId) {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) throw new Error('Campaign not found');

    const donationIndex = campaign.donations.findIndex(d => d._id.toString() === donationId);
    if (donationIndex === -1) throw new Error('Donation not found');

    campaign.donations.splice(donationIndex, 1);
    return await campaign.save();
  }

  async getDashboardInsights() {
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

    return {
      totalCampaigns,
      totalDonationAmount: totalDonations[0]?.total || 0,
      totalDonorCount: totalDonors[0]?.totalDonors || 0
    };
  }

  async updateCampaign(id, data, filePath) {
    const { title, story, goal, endDate } = data;
    const campaignData = { title, story, goal, endDate };
    if (filePath) {
      campaignData.image = filePath;
    }
    const campaign = await Campaign.findByIdAndUpdate(id, campaignData, { new: true });
    if (!campaign) throw new Error('Campaign not found');
    return campaign;
  }

  calculateDaysLeft(endDate) {
    const endDateObj = new Date(endDate);
    const currentDate = new Date();
    return Math.ceil((endDateObj - currentDate) / (1000 * 60 * 60 * 24));
  }
}

module.exports = new CampaignService();
