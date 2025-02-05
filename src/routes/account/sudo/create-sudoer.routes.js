const { verifySignUp, authJwt } = require("../../../middleware");
const controller = require("../../../controllers/account/sudo/create-sudoer.controller");
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
    "/api/user/create-sudoer",
    
    upload.array(),
    [authJwt.verifyUserToken],
    [
      verifySignUp.checkDuplicateUser,
    ],
    controller.createSudoer
  );
};
