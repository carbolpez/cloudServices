
const model = require('../model/db.js').model;
var registryService = {
    registerOperator: function (req, res, next) {
        console.log("registerOperator --> Iniciando...");
        console.log("registerOperator --> req.body: " + JSON.stringify(req.body));
        let auxmetadata = req.body;

        if (auxmetadata != null)
        {
            model.operatorMetadata.dao.operatorMetadataDAO.addOperatorMetadata(auxmetadata, function(err, response){
              if (err)
                console.log("RegistryService.addOperatorMetadataCallback --> err: " + err);
              return res.json(response);
            });
        }
        else {
          return res.json({ retCode: 1 })
        }

    }
};

module.exports.registerOperator = registryService.registerOperator;
