var express = require('express');
var router = express.Router();
var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


var TrackService = require('../src/services/TrackService.js').trackService;
var RegistryService = require('../src/services/RegistryService.js').registryService;
var AdminService = require('../src/services/AdminService.js').adminService;

router.use('/registry/registerOperator', RegistryService.registerOperator);
router.use('/registry/findRegisters', RegistryService.findRegisters);
router.use('/track/addTrackImage', upload.single('image'), TrackService.addTrackImage);
router.use('/track/addTrackImages', upload.array('images', 20), TrackService.addTrackImages);
router.use('/track/getImageList', TrackService.getImageList);
router.use('/track/getImage', TrackService.getImage);
router.use('/admin/deleteOperator', AdminService.deleteOperators);
router.use('/admin/deleteImages', AdminService.deleteImages);
module.exports = router;
