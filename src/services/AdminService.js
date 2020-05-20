
const model = require('../model/db.js').model;
var adminService = {
    deleteOperators: function (req, res, next) {
        console.log("deleteOperators --> Iniciando...");
        //console.log("registerOperator --> req.body: " + JSON.stringify(req.body));
        model.operatorMetadata.dao.operatorMetadataDAO.deleteAll(function(err, response){
          if (err){
            console.log("AdminService.deleteOperators --> err: " + err);
            return res.json({retCode:1, errorMessage: err})
          }
          else {
            return res.json(response);
          }

        });
    },
    deleteImages: function (req, res, next) {
    try {

        console.log("deleteImages --> Iniciando...");
        console.log("registerOperator --> req.body: " + JSON.stringify(req.body));
        model.image.dao.imageDAO.deleteAll(function(err, response){
          if (err){
            console.log("AdminService.deleteImages --> err: " + err);
            return res.json({retCode:1, errorMessage: err})
          }
          else {
            return res.json(response);
          }

        });
      }catch(exc){
          console.log("AdminService.deleteImages --> exc: " + exc);
          return res.json({retCode:1,errorMessage:exc.message})
        }
    }
};

module.exports.adminService = adminService;
