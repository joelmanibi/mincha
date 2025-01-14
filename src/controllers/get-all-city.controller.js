const db = require("../models");
const Ville = db.ville;

exports.getAllCity = async (req,res) => {

    try {
      const city = await Ville.findAll({});
      if (city.length == 0) {
        return res.status(403).send({
          message: "Aucune ville trouvé"
        });
      };
        
        res.status(200).json({
          city
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };