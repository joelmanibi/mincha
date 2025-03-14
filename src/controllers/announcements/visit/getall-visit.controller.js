const db = require("../../../models");
const { getAllVisit } = require('./visitService');


exports.getAllVisits = async (req,res) => {
  try {
    const visit = await getAllVisit()
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