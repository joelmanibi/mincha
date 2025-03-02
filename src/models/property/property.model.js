module.exports = (sequelize, Sequelize) => {
    const Property = sequelize.define("property", {
        propertyId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ownerId : {
        type: Sequelize.INTEGER,
      },
      propertyTypeID : {
        type: Sequelize.INTEGER,
      },
      propertyLocation : {
        type: Sequelize.INTEGER,
      },
      propertyPrice: {
        type: Sequelize.INTEGER,
      },
      propertyArea: {
        type: Sequelize.INTEGER,
      },
      piscine: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      livingRoom: {
        type: Sequelize.INTEGER,
      },
      bedroom :{
        type: Sequelize.INTEGER,
      },
      garagePlace :{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bathroom :{
        type: Sequelize.INTEGER,
      },
      propertyLevel : {
        type: Sequelize.INTEGER,
      },
      propertyApproved : {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approvalComment : {
        type: Sequelize.TEXT,
      },
      approvalDate : {
        type: Sequelize.DATE,
      },
      approverUser: {
        type: Sequelize.INTEGER,
      },
      propertyDocTypeID: {
        type: Sequelize.INTEGER,
      },
      propertyDoc: {
        type: Sequelize.STRING
      }
    }
      );
      return Property;
};