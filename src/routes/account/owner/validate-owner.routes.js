const { authJwt } = require("../../../middleware");
const controller = require("../../../controllers/account/owner/validate-owner.controller");
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
    "/api/account/validate-owner",
    upload.array(),
    [authJwt.verifyUserToken],
    controller.validateOwner
  );
};