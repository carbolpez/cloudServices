var mongoose = require('mongoose');

var OperatorMetadataSchema = new mongoose.Schema({
     _id: {type: Number},
     postalAddress: {type: String},
     email: {type: String},
     company: {type: String},
     status: {type: String},
     type: {type: String},
     drones:[{type:String}]
});

module.exports.operatorMetadata = mongoose.model('OperatorMetadata', OperatorMetadataSchema);
