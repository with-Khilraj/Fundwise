const express = require('express');
const router = express.Router();
const campaignController = require('./campaign.controller');
const authMiddleware = require('../../common/middleware/authMiddleware');
const upload = require('../../common/middleware/upload');

// Public routes
router.get('/', campaignController.getCampaigns);
router.get('/:id/comments', campaignController.getComments);

// Protected routes (User)
router.post('/create', authMiddleware, upload.single('image'), campaignController.createCampaign);
router.get('/mine', authMiddleware, campaignController.getCampaignsByUser);
router.patch('/raise/:id', authMiddleware, campaignController.updateRaisedAmount);
router.patch('/top-donors/:id', authMiddleware, campaignController.updateTopDonors);
router.post('/:id/comment', authMiddleware, campaignController.addComment);
router.put('/:id', authMiddleware, upload.single('image'), campaignController.updateCampaign);

// Admin/Protected routes
router.delete('/:id', authMiddleware, campaignController.deleteCampaign);
router.get('/donations/all', authMiddleware, campaignController.getAllDonations);
router.delete('/donations/:campaignId/:donationId', authMiddleware, campaignController.deleteDonation);
router.get('/dashboard/insights', authMiddleware, campaignController.getDashboardInsights);

module.exports = router;
