const { authJwt } = require("../../middleware");
const controller = require("../../controllers/wallet/subst-balance.controller");
var multer = require('multer');
var upload = multer();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    
  });
  app.post(
    "/api/wallet/subst-balance",
    [authJwt.verifyUserToken],
    upload.array(),
    controller.substBalance
  );
};