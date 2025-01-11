const db = require("../../models");
const Property = db.property;
const PropertyPhoto = db.propertyPhoto;
const deleteFile = require('../../../helpers/user/deleteFileService');

exports.deleteProperty = async (req, res) => {

    try {
      const propertyPhoto = await PropertyPhoto.findAll({where: {
        propertyID: req.params.propertyId
      }})
      console.log(propertyPhoto);
      if (Object.keys(propertyPhoto).length > 0) {
        await Promise.all(propertyPhoto.map(file => deleteFile("assets/property/photo/"+file.propertyPhotoName)));
      
      }
      
    
      const deletPropertyPhoto = await PropertyPhoto.truncate({
        where: {
          propertyID: req.params.propertyId
        }
      });
      const property = await Property.findOne({
        where: {
          propertyId: req.params.propertyId
        }
      });
      
      if (Object.keys(property).length > 0) {
        await deleteFile("assets/property/doc/"+property.propertyDoc)
      }

      const deletProperty = await Property.destroy({
        where: {
          propertyID: req.params.propertyId
        }
      });
      if (!deletProperty) {
        return res.status(403).send({
          message: "échec de la suppression de la proprieté",
        });
      };
      
        res.status(200).json({
          message: "La propriété a été supprimé avec succes",
          statutcode: 1
         });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };