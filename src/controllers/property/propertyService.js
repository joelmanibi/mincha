const db = require("../../models");
const Property = db.property;

const extractPropertyData = (req) => {
  
    return {
        propertyTypeID: req.body.propertyTypeID,
        propertyLocation: req.body.propertyLocation,
        propertyPrice: req.body.propertyPrice,
        propertyArea: req.body.propertyArea,
        livingRoom: req.body.livingRoom,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        piscine:req.body.piscine,
        garagePlace: req.body.garagePlace,
        propertyLevel: req.body.propertyLevel
    };
  };
  // Fonction pour créer un utilisateur
  const createProperty = async (propertyData) => {
    const property = await Property.create({
      ...propertyData, 
    });
  
    return property;
  };

  const updatProperty = async (propertyData,propertyId) => {
    const property = await Property.update({
      ...propertyData, 
    },{ where: { propertyId: propertyId } });
  
    return property;
  };
  
  module.exports = {
    extractPropertyData,
    createProperty,
    updatProperty
  };