const db = require("../../models");
const { getAllAnnouncement } = require('./announcementService');
const util = require('util');

exports.getAllAnnouncements = async (req,res) => {
  
    try {

      const announcement = await getAllAnnouncement()
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