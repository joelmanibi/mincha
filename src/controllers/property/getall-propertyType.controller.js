const db = require("../../models");
const PropertyType = db.propertyType;

exports.getAllPropertyType = async (req,res) => {
  
    try {

      const propertyType = await PropertyType.findAll({
       
      });
      if (propertyType.length == 0) {
        return res.status(403).send({
          message: "Aucun Type de proprieté trouvé",
          statutcode: 0
        });
      };
        
        res.status(200).json({
          propertyType,
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };