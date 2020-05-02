var mongoose = require('mongoose');

var OperatorMetadata = mongoose.model('OperatorMetadata');

var operatorMetadataDAO = {

	addOperatorMetadata: function(operatorMetadata_in, done){
		console.log("OperatorMetadataDAO.addOperatorMetadata --> " + operatorMetadata_in);
		var operatorMetadata = new OperatorMetadata();
		operatorMetadata._id = operatorMetadata_in._id;
		operatorMetadata.postalAddress = operatorMetadata_in.postalAddress;
		operatorMetadata.company = operatorMetadata_in.company;
		operatorMetadata.email = operatorMetadata_in.email;
		operatorMetadata.status = operatorMetadata_in.status;
		operatorMetadata.type = operatorMetadata_in.type;
		operatorMetadata.drones = operatorMetadata_in.drones;

		operatorMetadata.save(function (err, operatorMetadata, numAffected) {
		    if (err) {
		        return done(err, { retCode: 1, errorMessage:err });
		    }
		    return done(null, { retCode: 0});
		});
	},
	deleteAll: function(done){
		OperatorMetadata.deleteMany({}, function (err) {
		    if (err) {
		        return done(err, { retCode: 1 });
		    }
		    return done(null, { retCode: 0 });
		})
	},

	findById: function(id, done){
		OperatorMetadata.findById(id).exec(function(err, operatorMetadata){
			if (err)
			{
				return done(err, { retCode: 1 });
			}
			else {
				return done(null, { retCode: 0, operatorMetadata: operatorMetadata });
			}
		})
	}

}//var

module.exports.operatorMetadataDAO = operatorMetadataDAO;
