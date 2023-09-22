const express = require('express');
const router = express.Router();
const weatherController = require('../app/controllers/WeatherControllers');

router.get('/', weatherController.search);
module.exports = router;
