const { authJwt } = require("../../middleware");
const controller = require("../../controllers/announcements/visit/add-visit.controller");
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
    "/api/announcement/visit/add-visit",
    [authJwt.verifyAccountToken],
    upload.array(),
    controller.addVisit
  );
};