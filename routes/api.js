const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

router.get('/career-guide', careerController.getCareerGuide);

module.exports = router;
