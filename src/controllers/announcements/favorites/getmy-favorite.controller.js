const db = require("../../../models");
const { getMyfavorite } = require('./favoriteService');

exports.getMyfavorites = async (req,res) => {
  try {
    const favorite = await getMyfavorite(req)
    if (visit.length == 0) {
      return res.status(403).send({
        message: "Aucun rendez-vous trouvé",
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