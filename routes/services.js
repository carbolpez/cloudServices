var express = require('express');
var router = express.Router();

var SecurityService = require('../src/services/SecurityService.js');
var TrackService = require('../src/services/TrackService.js');
var RegistryService = require('../src/services/RegistryService.js');


router.use('/security/login', SecurityService.login);
router.use('/registry/registerOperator', RegistryService.registerOperator);
router.use('/track/listTracks', TrackService.listTracks);
router.use('/track/recordTrack', TrackService.recordTrack);
router.use('/track/viewTrack', TrackService.viewTrack);

module.exports = router;
