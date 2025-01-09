const db = require("../../../models");
const User = db.user;
const UserType = db.userType;
const UserRole = db.userRole;

exports.getAllUser = async (req,res) => {
  
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ['userPassword', 'userToken', 'CodeOTP', 'userIdCardFront', 'userIdCardBack'],
      },
      include: [
        {
            model: UserRole,
        },
        {
            model: UserType,
        }
    ],
      });
      if (user.length == 0) {
        return res.status(403).send({
          message: "Aucun utilisateur trouvé"
        });
      };
        
        res.status(200).json({
          user
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };