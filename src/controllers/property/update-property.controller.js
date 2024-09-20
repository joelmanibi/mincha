const db = require("../../models");
const { updatProperty } = require('./propertyService');
const Property = db.property;

exports.updateProperty = async (req, res) => {
  const propertyExist = await Property.findOne({
    where: {
      propertyId: req.body.propertyId
    }
  });
  if (!propertyExist) {
    return res.status(403).send({
      message: "Ce bien est introuvable dans la base",
      statutcode: 0
    });
  };
    
    try {
        let propertyData = {}

        if(req.body.propertyTypeID){
          propertyData.propertyTypeID = req.body.propertyTypeID
        }
        if(req.body.propertyLocation){
          propertyData.propertyLocation= req.body.propertyLocation
        }
        if(req.body.propertyPrice){
          propertyData.propertyPrice= req.body.propertyPrice
        }
        if(req.body.propertyArea){
          propertyData.propertyArea= req.body.propertyArea
        }
        if(req.body.livingRoom){
          propertyData.livingRoom= req.body.livingRoom
        }
        if(req.body.bedroom){
          propertyData.bedroom= req.body.bedroom
        }
        if(req.body.bedroom){
          propertyData.bedroom= req.body.bedroom
        }

        if(req.body.bathroom){
          propertyData.bedroom= req.body.bathroom
        }

        if(req.body.propertyLevel){
          propertyData.bedroom= req.body.propertyLevel
        }
        
        if (Object.keys(propertyData).length > 0) {
          await updatProperty(propertyData,req.body.propertyId);
        }

        res.status(200).json({
          message: "Les informa propriété a été mise a jour avec succes",
          statutcode: 1
         });
        
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };