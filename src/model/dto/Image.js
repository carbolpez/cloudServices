var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
     //_id: {type: Number},
     date: {type: Date},
     size: {type: String},
     trackMetadata: {type: String},
     img: { data: Buffer, contentType: String },
     thumb: { data: Buffer, contentType: String },
     link: {type: String}
});

module.exports.image = mongoose.model('Image', ImageSchema);
