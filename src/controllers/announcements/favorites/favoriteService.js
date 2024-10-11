const db = require("../../../models");
const Favorite = db.favorite;
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
        favoriteUser : req.userId
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