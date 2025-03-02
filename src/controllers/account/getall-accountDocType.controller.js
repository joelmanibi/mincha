const db = require("../../models");
const AccountDocType = db.accountDocType;

exports.getAllAccountDocType = async (req,res) => {
  
    try {
      const docType = await AccountDocType.findAll({
      });
      if (docType.length == 0) {
        return res.status(200).send({
          message: "Aucun Type de account trouvé",
          statutcode: 0
        });
      };
        
        res.status(200).json({
          docType
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };