const db = require("../../../models");
const User = db.user;
const UserType = db.userType;
const UserRole = db.userRole;
const Account = db.account;
const AccountType = db.accountType

exports.getAllUser = async (req,res) => {

  const requesterIsAdmin = await User.findOne({
    where: {
      userId: req.userId,
      userRoleID: 1,
      userTypeID: 5
    }
  });
  if (!requesterIsAdmin) {
    return res.status(403).send({
      message: "Vous n'etes pas authorisé a éffectuer cette requete, merci de contacter l'administrateur pour support",
    });
  };
  
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ['userPassword', 'userToken', 'CodeOTP'],
      },
      include: [
        {
            model: UserRole,
        },
        {
            model: UserType,
        },
        {
          model:Account,
          include:[
            {
              model:AccountType
            }
          ],
          attributes: {
            exclude: ['accountToken'],
        },
        
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