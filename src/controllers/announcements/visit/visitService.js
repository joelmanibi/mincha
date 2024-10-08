const db = require("../../../models");
const Visit = db.visit;
const Announcement = db.announcement;
const Property = db.property;
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const Ville =db.ville
const PropertyPhoto = db.propertyPhoto;

const extractVisitData = (req) => {
    return {
      propertyAnnouncement: req.body.propertyAnnouncement,
      visitScheduledDate : req.body.visitScheduledDate,
      contactClient : req.body.contactClient
    };
  };

  // Fonction pour créer un utilisateur
  const createVisit = async (visitData) => {
    const visit = await Visit.create({
      ...visitData, 
    });
    return visit;
  };

  const ifVisitExist = async (req) => {
    const visit = await Visit.findOne({
            where : {
              clientId: req.userId,
              propertyAnnouncement: req.body.propertyAnnouncement
            },
    });
    return visit;
  };

  const getMyVisit = async (userId) => {
    const visit = await Visit.findAll({
      where : {
        clientId: userId,
      },
        include : [
            {
              model: Announcement,
              include: [
                {
                    model: Property,
                    include: [
                       {
                          model: PropertyType
                        },
                        {
                          model: Ville
                        },
                        {
                          model: PropertyDocType
                        },
                        {
                          model: PropertyLevel
                        },
                        {
                          model: PropertyPhoto
                        }
                    ]
                  }
              ]
            }
          ]
    });
  
    return visit;
  };
  
  module.exports = {
    getMyVisit,
    extractVisitData,
    createVisit,
    ifVisitExist
  };