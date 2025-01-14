const db = require("../../models");
const Account = db.account;
const AccountType = db.accountType;
const { findUserSudoByuserId } = require('./userService');

exports.getAllAccount = async (req,res) => {

  const requesterIsAdmin = await findUserSudoByuserId(req.userId);
    if (!requesterIsAdmin) {
      return res.status(403).send({
        message: "Vous n'êtes pas autorisé à effectuer cette requête. Contactez un administrateur.",
      });
    }

    try {
      const account = await Account.findAll({
        include:[
          {
            model:AccountType
          }
        ]
      });
      if (account.length == 0) {
        return res.status(403).send({
          message: "Aucun compte trouvé"
        });
      };
        
        res.status(200).json({
          account
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };