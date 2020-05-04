
const model = require('../model/db.js').model;
var registryService = {
    registerOperator: function (req, res, next) {
        console.log("registerOperator --> Iniciando...");
        //console.log("registerOperator --> req.body: " + JSON.stringify(req.body));
        let auxmetadata = req.body;

        if (auxmetadata != null)
        {
            model.operatorMetadata.dao.operatorMetadataDAO.addOperatorMetadata(auxmetadata, function(err, response){
              if (err)
              {
                console.log("RegistryService.registerOperator --> err: " + err);
                return res.json({codRet:1, errorMessage: err})
              }
              else {
                return res.json(response);
              }

            });
        }
        else {
          return res.json({ retCode: 1, errorMessage: "Invalid params" })
        }

    },
    findRegisters: function(req, res, next) {
      console.log("findRegisters --> Iniciando...");
      let auxquery = req.body;
      if (auxquery != null)
      {
        model.operatorMetadata.dao.operatorMetadataDAO.findAll(function(err, response){
          if(err){
            console.log("RegistryService.findRegisters --> err: " + err);
            return res.json({cod:1, errorMessage: err});
          }
          else {
            console.log("findRegisters --> response: " + JSON.stringify(response));
            return res.json(response);
          }
        })
      }
      else {
        return res.json({ retCode: 1, errorMessage: "Invalid params" })
      }
    }
};

module.exports.registryService = registryService;
