const { authJwt } = require("../../../middleware");
const controller = require("../../../controllers/announcements/announcementType/announcementType.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    
  });
  app.get(
    "/api/announcement/getall-announcement-type",
    [authJwt.verifyUserToken],
  //  upload.array(),
    controller.getAllAnnouncementTypes
  );
};