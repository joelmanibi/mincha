const { authJwt } = require("../../../middleware");
const controller = require("../../../controllers/announcements/visit/getmy-visit.controller");
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
  app.get(
    "/api/announcement/visit/getmy-visit",
   [authJwt.verifyUserToken],
    upload.array(),
    controller.getMyVisits
  );
};