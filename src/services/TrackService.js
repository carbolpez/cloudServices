
var trackService = {
    listTracks: function (req, res, next) {
        console.log("listTracks --> Iniciando...");
        return res.json({code:"ok"});
    },
    recordTrack: function (req, res, next) {
        console.log("recordTrack --> Iniciando...");
        return res.json({code:"ok"});
    },
    viewTrack: function (req, res, next) {
        console.log("viewTrack --> Iniciando...");
        return res.json({code:"ok"});
    }
};

module.exports.listTracks = trackService.listTracks;
module.exports.recordTrack = trackService.recordTrack;
module.exports.viewTrack = trackService.viewTrack;
