const db = require("../../../models");
const Favorite = db.favorite;
const Announcement = db.announcement;
const AnnouncementType = db.announcementType;
const Property = db.property;
const PropertyType = db.propertyType;
const PropertyDocType = db.propertyDocType;
const PropertyLevel = db.level;
const Ville = db.ville;
const PropertyPhoto = db.propertyPhoto

const extractFavoriteData = (req) => {
    return {
        favoriteAnnouncement: req.body.favoriteAnnouncement,
        favoriteUser : req.userId
    };
  };

  // Fonction pour créer un utilisateur
  const createFavorite = async (favoriteData) => {
    const favorite = await Favorite.create({
      ...favoriteData,
    });
    return favorite;
  };

  const ifFavoriteExist = async (req) => {
    const favorite = await Favorite.findOne({
            where : {
                favoriteAnnouncement: req.body.favoriteAnnouncement,
                favoriteUser : req.userId
            },
    });
    return favorite;
  };

  const ifFavoriteActive = async (req) => {
    const favorite = await Favorite.findOne({
            where : {
                favoriteAnnouncement: req.body.favoriteAnnouncement,
                favoriteUser : req.userId,
                favoriteActive:1
            },
    });
    return favorite;
  };

  const updateFavorite = async (req,updateId) => {
    const favorite = await Favorite.update({
        favoriteActive:updateId,
    },{ where: {
        favoriteAnnouncement: req.body.favoriteAnnouncement,
        favoriteUser : req.userId } });
    return favorite;
  };

  const getMyfavorite = async (req) => {
    const favorite = await Favorite.findAll({
      where : {
        favoriteUser : req.userId,
        favoriteActive: true,
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
                  },
                  {
                    model: AnnouncementType,
                  }
              ]
            }
          ]
    });
    return favorite;
  };


  module.exports = {
    getMyfavorite,
    updateFavorite,
    ifFavoriteActive,
    extractFavoriteData,
    createFavorite,
    ifFavoriteExist
  };