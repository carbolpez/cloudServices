var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
  _id: {type: Number},
  name: {type: String, lowercase: true, unique: true},
  validation: { statesForbidden: [{ type: String }], print : Boolean },
  app: String,
  menu: [
            {id: Number,
             name: String,
             icon: String,
             link: String,
             template:String,
             angLinks: [{name: String, link:String, template:String}],
             nodeLinks: [{type:String}],
             desc: String
            }]
});


module.exports.role = mongoose.model('Role', RoleSchema);
