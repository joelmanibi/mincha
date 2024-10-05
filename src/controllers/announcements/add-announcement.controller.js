const db = require("../../models");
const Account = db.account;
const Property = db.property;
const MyConfig = require("../randomService")
const { createAnnouncement,ifAnnounceExist, extractAnnouncementData } = require('./announcementService');


exports.addAnnouncement = async (req, res) => {
  const timestamp = Date.now();
  const accountIsActived = await Account.findOne({
    where: {
      accountIsApproved: 1,
      accountIsActive: 1,
      accountId: req.accountId
    }
  });
  if (!accountIsActived) {
    return res.status(403).send({
      message: "Vous n'etes pas authorisé a éffectuer cette requete, merci de contacter l'administrateur pour support",
      statutcode: 0
    });
  };
   
    try {

        const property = await Property.findOne({
            where: {
              propertyId: req.body.announcementProperty
            }
          });
      
          if (!property) {
            return res.status(403).send({
              message: "Cette proprieté n'existe pas dans la base",
              statutcode:0
            });
          }
        const checkExstAnnouncement = await ifAnnounceExist(req.body.announcementProperty);
        if (checkExstAnnouncement) {
            return res.status(403).send({
              message: "Une annonce existe deja pour cette propriéte",
              statutcode:0
            });
          }
        const announcementData = extractAnnouncementData(req);
        const fullAnnouncementData = {
            ...announcementData,
            announcementProperty: req.body.announcementProperty,
            announcementCode : "A-"+ timestamp 
        };
        await createAnnouncement(fullAnnouncementData);

        res.status(200).json({
          message: "L'annonce a été ajouté avec succes en attente de validation",
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };