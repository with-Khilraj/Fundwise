const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', contactController.createContact);
router.get('/', authMiddleware, contactController.getContacts);
router.delete('/:id', authMiddleware, contactController.deleteContact);

module.exports = router;