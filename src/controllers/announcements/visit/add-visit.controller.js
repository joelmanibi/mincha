const db = require("../../models");
const { extractVisitData,createVisit } = require('../visitService');


exports.addVisit = async (req, res) => {
  const timestamp = Date.now();

    try {

        const visitData = extractVisitData(req);
        const fullVisitData = {
            ...visitData,
            visitCode : "V-"+ timestamp,
            clientId: req.userId
        };
        await createVisit(fullVisitData);

        res.status(200).json({
          message: "La visite a été crée avec succes",
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };