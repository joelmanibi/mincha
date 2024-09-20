const db = require("../../models");
const { getMyAnnouncement } = require('./announcementService');
const util = require('util');

exports.getAllMyAnnouncements = async (req,res) => {
  
    try {

      const announcement = await getMyAnnouncement(req.accountId)
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