var mongoose = require('mongoose');

var TrackMetadataSchema = new mongoose.Schema({
     _id: {type: Number},
     codCity: {type: String},
     city: {type: String},
     codRegion: {type: String},
     region: {type: String},
     codCountry: {type: String},
     country: {type: String},
     codCity: {type: String},
     users: {type: Number},
     score: {type: Number},
     status: {type: String},
     type: {type: String},
     images: [{type: mongoose.Schema.Types.ObjectId, ref:'Image'}]
});

module.exports.trackMetadata = mongoose.model('TrackMetadata', TrackMetadataSchema);
