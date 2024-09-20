const db = require("../../models");
const { updatAnnouncement } = require('./announcementService');
const Announcement = db.announcement;

exports.updateAnnouncement = async (req, res) => {
  const announcementExist = await Announcement.findOne({
    where: {
      announcementId: req.body.announcementId
    }
  });
  if (!announcementExist) {
    return res.status(403).send({
      message: "Annonce introuvable dans la base",
      statutcode: 0
    });
  };
    
    try {
        let announcementData = {}

        if(req.body.announcementTypeID){
          announcementData.announcementTypeID = req.body.announcementTypeID
        }
        if(req.body.propertyPrice){
          announcementData.propertyPrice= req.body.propertyPrice
        }
        if(req.body.propertyDescription){
          announcementData.propertyDescription= req.body.propertyDescription
        }
        if(req.body.announcementStatusID){
          announcementData.announcementStatusID= req.body.announcementStatusID
        }
        
        if (Object.keys(announcementData).length > 0) {
          await updatAnnouncement(announcementData,req.body.announcementId);
        }

        res.status(200).json({
          message: "L'annonce a été mise a jour avec succes",
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };