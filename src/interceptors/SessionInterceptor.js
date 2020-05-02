var SessionInterceptor = {
    verifyToken: function (req, res, next) {
        console.log("verifyToken --> Iniciando...");
    }
};

module.exports.verifyToken = SessionInterceptor.verifyToken;
