const db = require("../../models");
const Announcement = db.announcement;

exports.deleteAnnouncement = async (req, res) => {
    try {
      const deletAnnouncement = await Announcement.destroy({
        where: {
          propertyID: req.params.propertyId
        }
      });
      if (!deletAnnouncement) {
        return res.status(403).send({
          message: "échec de la suppression de la l'annonce",
          statutcode: 0
        });
      };
        res.status(200).json({
          message: "L'annonce a été supprimé avec succes",
          statutcode: 1
         });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };