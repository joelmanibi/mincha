const db = require("../../models");
const Announcement = db.announcement;
const AnnouncementType = db.announcementType;
const Property = db.property;
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const Ville = db.ville;
const Favorite = db.favorite;
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

  const getUserFavorites = async (userId) => {
    
    return await Favorite.findAll({
        where: { favoriteUser: userId, favoriteActive: 1 }, // Supposons que favoriteActive = 1 signifie que le favori est actif
        attributes: ['favoriteAnnouncement'], // Récupérer seulement les IDs des annonces favorites
    });
};

  const getAllAnnouncement = async (userId) => {
    try {
        // Récupérer les annonces
        const announcements = await Announcement.findAll({
            include: [
                {
                    model: Property,
                    include: [
                        {
                            model: PropertyType,
                        },
                        {
                            model: PropertyDocType,
                        },
                        {
                            model: PropertyLevel,
                        },
                        {
                            model: Ville,
                        },
                        {
                            model: PropertyPhoto, // Inclusion des photos associées à la propriété
                        },
                    ],
                },
                {
                    model: AnnouncementType,
                },
            ],
        });

        // Récupérer les favoris de l'utilisateur
        const userFavorites = await getUserFavorites(userId);
        
        const favoriteIds = userFavorites.map(favorite => favorite.favoriteAnnouncement);

        // Ajouter le champ IsFavorite
        const announcementsWithFavoriteStatus = announcements.map(announcement => ({
            ...announcement.toJSON(), // Convertir l'instance Sequelize en objet plain
            IsFavorite: favoriteIds.includes(announcement.announcementId), // Vérifier si l'annonce est favorite
        }));

        return announcementsWithFavoriteStatus;
    } catch (error) {
        console.error("Error fetching announcements: ", error);
        throw new Error("Unable to fetch announcements");
    }
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