const db = require("../../../models");
const { extractVisitData,createVisit,ifVisitExist } = require('./visitService');


exports.addVisit = async (req, res) => {
  const timestamp = Date.now();
    try {
      const checkExstVisit = await ifVisitExist(req);
        if (checkExstVisit) {
            return res.status(403).send({
              message: "Vous avez pris rendez-vous pour pour visiter ce bien",
              statutcode:0
            });
          }
        const visitData = extractVisitData(req);
        const fullVisitData = {
            ...visitData,
            VisitCode: "V-"+ timestamp,
            clientId: req.userId
        };
        await createVisit(fullVisitData);
        res.status(200).json({
          message: "Le rendez-vous avec succes",
          statutcode: 1
         });  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };