module.exports = (sequelize, Sequelize) => {
    const PropertyDocType = sequelize.define("propertydoctype", {
      propertyDocTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      propertyDocTypeName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return PropertyDocType;
};