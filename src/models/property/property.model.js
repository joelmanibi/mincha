module.exports = (sequelize, Sequelize) => {
    const Property = sequelize.define("property", {
        propertyId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ownerId : {
        type: Sequelize.INTEGER
      },
      propertyTypeID : {
        type: Sequelize.INTEGER
      },
      propertyLocation : {
        type: Sequelize.STRING
      },
      propertyPrice: {
        type: Sequelize.INTEGER
      },
      propertyArea: {
        type: Sequelize.INTEGER
      },
      livingRoom: {
        type: Sequelize.INTEGER
      },
      bedroom :{
        type: Sequelize.INTEGER
      },
      bathroom :{
        type: Sequelize.INTEGER
      },
      bathroom :{
        type: Sequelize.INTEGER
      },
      propertyLevel : {
        type: Sequelize.INTEGER
      },
      propertyApproved : {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approvalComment : {
        type: Sequelize.TEXT
      },
      approvalDate : {
        type: Sequelize.DATE
      },
      approverUser: {
        type: Sequelize.INTEGER
      },
      propertyDocTypeID: {
        type: Sequelize.INTEGER
      },
      propertyDoc: {
        type: Sequelize.STRING
      }
    }
      );
      return Property;
};