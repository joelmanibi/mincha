const db = require("../../../models");
const User = db.user;

exports.getAllUser = async (req,res) => {
  
    try {
      const user = await User.findAll({
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