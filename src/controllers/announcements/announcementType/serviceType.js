const db = require("../../../models");
const AnnouncementType = db.announcementType;
  // Fonction pour créer un utilisateur
  const getAllAtype = async () => {
    const announcementType = await AnnouncementType.findAll({
    });
  
    return announcementType;
  };
  
  module.exports = {
    getAllAtype
  };