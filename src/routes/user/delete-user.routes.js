const { authJwt } = require("../../middleware");
const controller = require("../../controllers/account/users/delete-user.controller");

module.exports = function(app) {
  // Middleware global pour définir les headers CORS
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Route DELETE pour supprimer un utilisateur
  app.delete(
    "/api/user/:userId", // Utilisation d'un paramètre dynamique pour l'ID utilisateur
    [authJwt.verifyUserToken], // Vérification du token utilisateur
    controller.deleteUser
  );
};
