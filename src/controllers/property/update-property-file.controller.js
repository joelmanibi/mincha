
const db = require("../../models");
const uploadProfile = require("../../../helpers/user/uploadFileService");
const util = require('util');
const fs = require('fs');
const path = require('path');
const deleteFile = require('../../../helpers/user/deleteFileService');
const PropertyPhoto = db.propertyPhoto
const Property = db.property;

exports.updatePropertyFile = async (req, res) => {
  const upload = util.promisify(uploadProfile.fields([
    { name: 'propertyDoc', maxCount: 1 },
    { name: 'property_photo', maxCount: 1 }
  ]));

  try {
    await upload(req, res);

    const property = await Property.findOne({
      where: {
        propertyId: req.body.propertyId
      }
    });

    if (!property) {
      return res.status(403).send({
        message: "Cette proprieté n'existe pas dans la base",
        statutcode:0
      });
    }

    // Obtenir les chemins des anciens fichiers
    const oldFilePaths = {
      propertyDoc: property.propertyDoc ? path.join('assets/property/doc/', property.propertyDoc) : null,
    };

   

    let updateDocFields = {};
    let filesToDelete = [];

    
    // Vérifiez et mettez à jour les fichiers utilisateur
    if (req.files['propertyDoc']) {
      if (oldFilePaths.propertyDoc) {
        filesToDelete.push(oldFilePaths.propertyDoc);
      }
      updateDocFields.propertyDoc = req.files['propertyDoc'][0].filename;
    }
    
    // Supprimer les fichiers anciens seulement s'ils ont été modifiés
    await Promise.all(filesToDelete.map(file => deleteFile(file)));

    
    // Mettre à jour les enregistrements Account
    if (Object.keys(updateDocFields).length > 0) {
      await Property.update(updateDocFields, { where: { propertyDoc: property.propertyDoc } });
    }

    if (req.files['property_photo']) {
      const propertyPhoto = await PropertyPhoto.count({where: {
        propertyID: req.body.propertyId
      }})
      if(propertyPhoto  >= 10 ) {
        res.status(403).json({
          message: "Le nombre maximal de photo a été atteint",
          statutcode: 0
        });
      }

      const photoPromises = req.files['property_photo'].map(file => {
        return PropertyPhoto.create({
          propertyID: req.body.propertyId, // Enregistrer le nom du fichier
          propertyPhotoName: file.filename
        });
      });
    }

    res.status(200).json({
      message: "Mise a jour effectué",
      statutcode: 1
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
