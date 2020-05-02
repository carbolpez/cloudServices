var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var model = {
    role : {
        dto: require('./dto/Role').role
    },
    user : {
        dto: require('./dto/User').user,
        dao: require('./dao/UserDAO')
    },
    operatorMetadata : {
        dto: require('./dto/OperatorMetadata').operatorMetadata,
        dao: require('./dao/OperatorMetadataDAO')
    },
    trackMetadata : {
        dto: require('./dto/TrackMetadata').trackMetadata,
    },
    image : {
        dto: require('./dto/Image').image,
    }
}
module.exports.model = model;
mongoose.connect('mongodb://devwikidrone:devwikidrone123@localhost:27017/wikidroneDB',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
