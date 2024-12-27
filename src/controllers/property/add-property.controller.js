const db = require("../../models");
const PropertyPhoto = db.propertyPhoto;
const Account = db.account;
const uploadProfile = require("../../../helpers/user/uploadFileService");
const util = require('util');
const { createProperty, extractPropertyData } = require('./propertyService');

exports.addProperty = async (req, res) => {
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
    });
  };
    const upload = util.promisify(uploadProfile.fields([
        { name: 'property_photo', maxCount: 10 },
        { name: 'propertyDoc', maxCount: 1 }
      ]));
    try {
        await upload(req, res);
        const propertyData = extractPropertyData(req);
        const fullPropertyData = {
          ...propertyData,
          ownerId: req.accountId,
          propertyDoc: req.files['propertyDoc'] ? req.files['propertyDoc'][0].filename : null,
        };
    
        const property = await createProperty(fullPropertyData);

        // Enregistrer chaque photo dans la base de données
        const photoPromises = req.files['property_photo'].map(file => {
          return PropertyPhoto.create({
            propertyID: property.propertyId, // Enregistrer le nom du fichier
            propertyPhotoName: file.filename
          });
        });

        res.status(200).json({
          message: "La propriété a été ajouté avec succes",
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };