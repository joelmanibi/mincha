const db = require("../../models");
const Level = db.level;

exports.getAllLevel = async (req,res) => {
  
    try {

      const level = await Level.findAll({
      });
      if (level.length == 0) {
        return res.status(200).send({
          message: "Aucun Type de proprieté trouvé"
        });
      };
        
        res.status(200).json({
          level
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };