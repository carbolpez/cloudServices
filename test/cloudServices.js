const assert = require('assert');
const db = require('mongoose');
const model = require('../src/model/db.js').model;


let operatorMetadataA = {
  _id: 1,
  postalAddress: "Calle Julián Camarillo 44, Portal A 3ºC",
  email: "cbolanos@minsait.com",
  company: "Minsait",
  status: "A",
  type: "T1",
  drones:["00001","00002"]
};


beforeEach(async () => {
    console.log("Before each...");
    model.operatorMetadata.dao.operatorMetadataDAO.deleteAll(function(err, response){
      if(err)
        console.log("deleteAllCallback -- > err: " + err);
  });
});

describe('OperatorMetadata', function() {
  it('saves an OperatorMetadata', function(done) {
    model.operatorMetadata.dao.operatorMetadataDAO.addOperatorMetadata(operatorMetadataA, function(err, response){
      if (response.retCode == 0){
          model.operatorMetadata.dao.operatorMetadataDAO.findById(1, function(err, response){
          if (response.retCode == 0 && response.operatorMetadata._id == 1)
            done();
          else
            done(new Error("Bad response:" + JSON.stringify(response)));
        });
      }
      else {
        //console.log("addOperatorMetadataCallback --> err: " + err);
        done(err);
      }
    });
  });
});

after(done => {
  model.operatorMetadata.dao.operatorMetadataDAO.deleteAll(function(err, response){
    if(err)
      console.log("deleteAllCallback -- > err: " + err);
      db.models = {};
      db.modelSchemas = {};
      db.connection.close();
      done();
  });
})
