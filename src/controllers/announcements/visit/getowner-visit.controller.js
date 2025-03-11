const db = require("../../../models");
const { getOwnerVisit } = require('./visitService');

exports.getOwnerVisits = async (req,res) => {
  try {
    const visit = await getOwnerVisit(req.accountId)
    if (visit.length == 0) {
      return res.status(200).send({
        message: "Aucun rendez-vous trouvé"
      });
    };
      res.status(200).json({
        visit
       });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};