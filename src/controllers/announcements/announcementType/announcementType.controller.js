const { getAllAtype } = require('./serviceType');

exports.getAllAnnouncementTypes = async (req,res) => {
  
    try {

      const announcementType = await getAllAtype()
      if (announcementType.length == 0) {
        return res.status(403).send({
          message: "Aucun type d'annonce trouvé",
          statutcode: 0
        });
      };
        res.status(200).json({
          announcementType,
          statutcode: 1
         });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };