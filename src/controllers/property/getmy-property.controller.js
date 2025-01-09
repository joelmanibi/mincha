const db = require("../../models");
const PropertyPhoto = db.propertyPhoto;
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const User = db.user;
const Ville = db.ville
const Property = db.property;
const util = require('util');

exports.getMyProperty = async (req,res) => {
  
    try {
      const user = await User.findOne({
        where: {
            userId: req.userId,
        }
      });

      const property = await Property.findAll({
        where: {
          ownerId: user.userAccount,
        },
        
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