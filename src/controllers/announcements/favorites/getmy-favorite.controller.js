const db = require("../../../models");
const { getMyfavorite } = require('./favoriteService');

exports.getMyfavorites = async (req,res) => {
  try {
    const favorite = await getMyfavorite(req)
    if (favorite.length == 0) {
      return res.status(403).send({
        message: "Aucune annonce dans vos favoris",
        statutcode: 0
      });
    };
      res.status(200).json({
        favorite,
        statutcode: 1
       });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};