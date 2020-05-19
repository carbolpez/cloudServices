

const model = require('../model/db.js').model;
var trackService = {
    addTrackImage: function (req, res, next) {
      try {
        console.log("addTrackImage --> Iniciando...");
        console.log("addTrackImages --> Iniciando. req.body: " + JSON.stringify(req.body));
        let auxImage = req.file;
        console.log("addTrackImage --> auxImage: " + JSON.stringify(auxImage));
        console.log("addTrackImage --> Imagen obtenida: " + auxImage);

        auxImage.metadata=req.body.metadata;

        if (auxImage != null)
        {
            model.image.dao.imageDAO.addTrackImage(auxImage, function(err, response){
              if (err)
              {
                console.log("TrackService.addTrackImage --> err: " + err);
                return res.json({retCode:1, errorMessage: err})
              }
              else {
                return res.json(response);
              }

            });
        }
        else {
          return res.json({ retCode: 1, errorMessage: "Invalid params" })
        }
      }
      catch(exc){
        console.log("TrackService.addTrackImage --> exc: " + exc);
        return res.json({retCode:1,errorMessage:exc.message})
      }
    },
    addTrackImages: function (req, res, next) {
      try {
        console.log("addTrackImages --> Iniciando. req.headers: " + JSON.stringify(req.headers));
        console.log("addTrackImages --> Iniciando. req.body: " + JSON.stringify(req.body));
        let auxImages = req.files;//req.files
        auxImage.metadata=req.body.metadata;
        if (auxImage != null)
        {
            model.image.dao.imageDAO.addTrackImage(auxImage, function(err, response){
              if (err)
              {
                console.log("TrackService.addTrackImages --> err: " + err);
                return res.json({retCode:1, errorMessage: err})
              }
              else {
                return res.json(response);
              }

            });
        }
        else {
          return res.json({ retCode: 1, errorMessage: "Invalid params" })
        }
      }
      catch(exc){
        console.log("TrackService.addTrackImages --> exc: " + exc);
        return res.json({retCode:1,errorMessage:exc.message})
      }
    },
    getImageList: function (req, res, next) {
      try {
        console.log("getImageList --> Iniciando. req.headers: " + JSON.stringify(req.headers));
        console.log("getImageList --> Iniciando. req.body: " + JSON.stringify(req.body));
        let reqBody = req.body;//req.files
        if (reqBody != null){
            var query = {};
            query.trackMetadata=reqBody.metadata;
            /*
            var select = {};
            select.img.data=0;
            */
            model.image.dao.imageDAO.findImages(query,function(err, response){
              if (err){
                console.log("TrackService.getImageList --> err: " + err);
                return res.json({retCode:1, errorMessage: err})
              }
              else {
                console.log("TrackService.getImageList --> response: " + JSON.stringify(response));
                return res.json(response);
              }
            });
        }
        else {
          return res.json({ retCode: 1, errorMessage: "Invalid params" })
        }
      }
      catch(exc){
        console.log("TrackService.getImageList --> exc: " + exc);
        return res.json({retCode:1,errorMessage:exc.message})
      }
    },
    getImage: function (req, res, next) {
      try {
        //console.log("getImage --> Iniciando. req.headers: " + JSON.stringify(req.headers));
        //console.log("getImage --> Iniciando. req.query: " + JSON.stringify(req.query));

        if (req.query != null){
            var id = req.query.id;
            model.image.dao.imageDAO.findById(id, function(err, response){
              if (err){
                console.log("TrackService.getImage --> err: " + err);
                return res.json({retCode:1, errorMessage: err})
              }
              else {
                console.log("TrackService.getImage --> response: " + JSON.stringify(response));
                if (response){
                  res.set('Content-Type', response.img.contentType);
                  return res.send(response.img.data);
                }
                else {
                  return res.json({ retCode: 1, errorMessage: "No results found" })
                }
              }
            });
        }
        else {
          return res.json({ retCode: 1, errorMessage: "Invalid params" })
        }
      }
      catch(exc){
        console.log("TrackService.getImageList --> exc: " + exc);
        return res.json({retCode:1,errorMessage:exc.message})
      }
    }
};

module.exports.trackService = trackService;
