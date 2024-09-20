const db = require("../../models");
var bcrypt = require("bcryptjs");
const User = db.user;

exports.changePassword = async (req, res) => {

  const user = await User.findOne({
    where: {
      userId: req.userId
    }
  });
  if (!user) {
    return res.status(403).send({
      message: "Ce utilisateur n'existe pas dans la base"
    });
  }

  var passwordIsValid = bcrypt.compareSync(
    req.body.userLastPassword,
    user.userPassword
  );

  if (!passwordIsValid) {
    return res.status(401).json({
      message: "Votre ancien Mot de passe ne correspond pas!",
      statutcode: 0
    });
  }
    
    await User.update(
      { 
        userPassword: bcrypt.hashSync(req.body.userNewPassword, 8),
      },
      { where: { userId : req.userId } }
    );

    res.status(200).json({
      message : "Mot de passe Modifier avec succes ",
      statutcode: 1
    });
  };