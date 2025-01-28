const express = require('express');
const axios = require('axios');
const router = express.Router();
const Campaign = require('../models/Campaign'); // Adjust the path as needed

const KHALTI_SECRET_KEY = 'test_secret_key_b016e4084ed5462e980455201688ed60';

// Endpoint to verify payment
router.post('/verify-payment', async (req, res) => {
  const { token, amount, user } = req.body;
  console.log(`Received token: ${token}, amount: ${amount}, user: ${user}`);

  try {
    const response = await axios.post('https://khalti.com/api/v2/payment/verify/', {
      token,
      amount
    }, {
      headers: {
        'Authorization': `Key ${KHALTI_SECRET_KEY}`
      }
    });

    console.log('Khalti response:', response.data);

    if (response.data.state.name === 'Completed') {
      // Update the raised amount for the campaign and add a donation entry
      const campaignId = response.data.product_identity;
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return res.status(404).json({ msg: 'Campaign not found' });
      }

      const donation = {
        user,
        amount: amount / 100 // Assuming amount is in paisa
      };
      campaign.raised += donation.amount; // Update raised amount
      campaign.donations.push(donation); // Add donation entry
      await campaign.save();

      console.log('Updated campaign raised amount:', campaign.raised);
      console.log('Updated campaign donations:', campaign.donations);

      res.status(200).json({ success: true, message: 'Payment successful', updatedCampaign: campaign });
    } else {
      res.status(400).json({ success: false, message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error.message); // Log the error message
    console.error(error.stack); // Log the stack trace for more detailed debugging
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
  
});

module.exports = router;
