const db = require("../../../models");
const Visit = db.visit;

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
  
  module.exports = {
    extractVisitData,
    createVisit,
    ifVisitExist
  };