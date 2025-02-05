const db = require("../../models");
const PropertyPhoto = db.propertyPhoto;
const Account = db.account;
const uploadProfile = require("../../../helpers/user/uploadFileService");
const util = require('util');
const { createProperty, extractPropertyData } = require('./propertyService');
const { findUserSudoByuserId } = require('../account/userService');

exports.addPropertyBySudo = async (req, res) => {

  const requesterIsAdmin = await findUserSudoByuserId(req.userId);
    if (!requesterIsAdmin) {
      return res.status(403).send({
        message: "Vous n'êtes pas autorisé à effectuer cette requête. Contactez un administrateur.",
      });
    }

 
    const upload = util.promisify(uploadProfile.fields([
        { name: 'property_photo', maxCount: 10 },
        { name: 'propertyDoc', maxCount: 1 }
      ]));
    try {
        await upload(req, res);

        const accountIsActived = await Account.findOne({
          where: {
            accountIsApproved: 1,
            accountIsActive: 1,
            accountId: req.body.accountId
          }
        });
        if (!accountIsActived) {
          return res.status(403).send({
            message: "le compte choisi n'est pas autorié a ajouter un bien il est inactive ou invalide",
          });
        };

        
        const propertyData = extractPropertyData(req);
        const fullPropertyData = {
          ...propertyData,
          ownerId: req.body.accountId,
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