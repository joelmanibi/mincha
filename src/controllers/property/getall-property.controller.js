const db = require("../../models");
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const Property = db.property;
const User = db.user;
const Ville = db.ville;
const AccountType = db.accountType
const Account = db.account
const { findUserSudoByuserId } = require('../account/userService');

exports.getAllProperty = async (req,res) => {

  const requesterIsAdmin = await findUserSudoByuserId(req.userId);
    if (!requesterIsAdmin) {
      return res.status(403).send({
        message: "Vous n'êtes pas autorisé à effectuer cette requête. Contactez un administrateur.",
      });
    }
  
    try {

      const property = await Property.findAll({
       
        include : [
          {
            model: PropertyType
          },
          {
            model: PropertyDocType
          },
          {
            model: PropertyLevel
          },
          {
            model: Ville
          },
          {
            model:User
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

        ]
      });
      if (property.length == 0) {
        return res.status(403).send({
          message: "Aucune proprieté trouvé"
        });
      };
        
        res.status(200).json({
          property
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };