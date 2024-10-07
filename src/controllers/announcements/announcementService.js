const db = require("../../models");
const Announcement = db.announcement;
const AnnouncementType = db.announcementType;
const Property = db.property;
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const PropertyPhoto = db.propertyPhoto

const extractAnnouncementData = (req) => {
  
    return {
        
        
        announcementTypeID: req.body.announcementTypeID,
        propertyPrice: req.body.propertyPrice,
        propertyDescription: req.body.propertyDescription,
        announcementStatusID: 1
        
        
    };
  };
  // Fonction pour créer un utilisateur
  const createAnnouncement = async (announcementData) => {
    const announcement = await Announcement.create({
      ...announcementData, 
    });
  
    return announcement;
  };

  const updatAnnouncement = async (announcementData,announcementId) => {
    const announcement = await Announcement.update({
      ...announcementData, 
    },{ where: { announcementId: announcementId } });
  
    return announcement;
  };

  const getAllAnnouncement = async () => {
    const announcement = await Announcement.findAll({
        include : [
            {
              model: Property,
              include: [
                {
                    model: PropertyType
                  },
                  {
                    model: PropertyDocType
                  },
                  {
                    model: PropertyLevel
                  },
                  {
                    model: PropertyPhoto, // Inclusion des photos associées à la propriété
                  }
              ]
            },
            {
              model: AnnouncementType
            },
          ]
    });
    return announcement;
  };

  const getMyAnnouncement = async (accountId) => {
    const announcement = await Announcement.findAll({
        include : [
            {
              model: Property,
              where : {
                ownerId: accountId,
              },
              include: [
                {
                    model: PropertyType
                  },
                  {
                    model: PropertyDocType
                  },
                  {
                    model: PropertyLevel
                  }
              ]
            }
          ]
    });
  
    return announcement;
  };

  const ifAnnounceExist = async (announcementProperty) => {
    const announcement = await Announcement.findOne({
        include : [
            {
              model: Property,
              where : {
                propertyId: announcementProperty,
              },
              
            }
          ]
    });
  
    return announcement;
  };
  
  module.exports = {
    getMyAnnouncement,
    getAllAnnouncement,
    extractAnnouncementData,
    createAnnouncement,
    updatAnnouncement,
    ifAnnounceExist
  };