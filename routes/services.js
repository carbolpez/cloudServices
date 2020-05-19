var express = require('express');
var router = express.Router();
var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


var TrackService = require('../src/services/TrackService.js').trackService;
var RegistryService = require('../src/services/RegistryService.js').registryService;

router.use('/registry/registerOperator', RegistryService.registerOperator);
router.use('/registry/findRegisters', RegistryService.findRegisters);
router.use('/track/addTrackImage', upload.single('image'), TrackService.addTrackImage);
router.use('/track/addTrackImages', upload.array('images', 3), TrackService.addTrackImages);
router.use('/track/getImageList', TrackService.getImageList);
router.use('/track/getImage', TrackService.getImage)
module.exports = router;
