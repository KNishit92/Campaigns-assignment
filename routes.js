var express = require('express');
var router = express.Router();

const {fetchCampaingnsSortByAmount, fetchActiveCampaingnsInLastMonth, fetchClosedCampaingns} = require('./controllers/CampaignController')

router.route('/').get(fetchCampaingnsSortByAmount)
router.route('/active').get(fetchActiveCampaingnsInLastMonth)
router.route('/closed').get(fetchClosedCampaingns)

module.exports = router;