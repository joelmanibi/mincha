const { authJwt } = require("../../middleware");
const controller = require("../../controllers/announcements/viewService.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next(); 
  });

  // Route pour incrémenter les vues d'une annonce
  app.post(
    "/api/announcement/count-view/:announcementId",
  //  [authJwt.verifyUserToken],
    controller.countViewAnnouncement
  );
};
