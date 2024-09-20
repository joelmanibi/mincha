const db = require("../../models");
const PropertyPhoto = db.propertyPhoto;
const util = require('util');

exports.getPropertyPhoto = async (req,res) => {
  
    try {

      const propertyPhoto = await PropertyPhoto.findAll({
        where: {
          propertyID: req.params.property
        }
      });
      if (propertyPhoto.length == 0) {
        return res.status(403).send({
          message: "Aucune proprieté trouvé",
          statutcode: 0
        });
      };
        
        res.status(200).json({
          propertyPhoto,
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };