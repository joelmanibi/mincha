const db = require("../../models");
const { getAllAnnouncementType } = require('./announcementService');

exports.getAllAnnouncementTypes = async (req,res) => {
  
    try {

      const announcement = await getAllAnnouncementType(req.userId)
      if (announcement.length == 0) {
        return res.status(403).send({
          message: "Aucune proprieté trouvé",
          statutcode: 0
        });
      };
        res.status(200).json({
          announcement,
          statutcode: 1
         });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };