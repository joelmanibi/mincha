const { getAllAnnouncement } = require('./announcementService');

exports.getAllAnnouncements = async (req,res) => {
  
    try {

      const announcement = await getAllAnnouncement(req.userId)
      if (announcement.length == 0) {
        return res.status(200).send({
          message: "Aucune annonce trouvé"
        });
      };
        res.status(200).json({
          announcement
         });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };