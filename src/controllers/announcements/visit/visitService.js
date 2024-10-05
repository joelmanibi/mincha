const db = require("../../../models");
const Visit = db.visit;

const extractVisitData = (req) => {
    return {
      propertyAnnouncement: req.body.propertyAnnouncement,
      propertyDescription: req.body.propertyDescription,
      visitScheduledDate : req.body.visitScheduledDate,
      visitScheduledHour :req.body.visitScheduledHour
    };
  };

  // Fonction pour créer un utilisateur
  const createVisit = async (visitData) => {
    const visit = await Visit.create({
      ...visitData, 
    });
    return visit;
  };
  
  module.exports = {
    extractVisitData,
    createVisit
  };