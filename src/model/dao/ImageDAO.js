var mongoose = require('mongoose');

var Image = mongoose.model('Image');

var imageDAO = {

	addTrackImage: function(image_in, done){
		console.log("ImageDAO.addTempImage --> " + JSON.stringify(image_in));
		var image = new Image();
		image.img.data = image_in.buffer;
		image.img.contentType = image_in.mimetype;
		image.size = image_in.size;
		image.trackMetadata = image_in.metadata;


		image.save(function (err, image, numAffected) {
		    if (err) {
		        return done(err, { retCode: 1, errorMessage:err });
		    }
		    return done(null, { retCode: 0});
		});
	},
	findImages: function(query, done){
		console.log("ImageDAO.findImages --> query: " + JSON.stringify(query));
		Image.find(query,{img:0}).exec(function (err, ret) {
			if (err){
				return done(err);
			}
			return done(null,ret);
		});
	},
	findById: function(id, done){
		console.log("ImageDAO.findImages --> id: " + id);
		Image.findById(new mongoose.Types.ObjectId(id)).exec(function (err, ret) {
			if (err){
				return done(err);
			}
			return done(null,ret);
		});
	}
}//var

module.exports.imageDAO = imageDAO;
