const db = require("../../models");
const PropertyPhoto = db.propertyPhoto;
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const Property = db.property;
const util = require('util');

exports.getMyProperty = async (req,res) => {
  
    try {

      const property = await Property.findAll({
        where: {
          ownerId: req.accountId
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
          }
        ]
      });
      if (property.length == 0) {
        return res.status(403).send({
          message: "Aucune proprieté trouvé",
          statutcode: 0
        });
      };
        
        res.status(200).json({
          property,
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };