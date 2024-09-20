module.exports = (sequelize, Sequelize) => {
    const PropertyType = sequelize.define("propertyType", {
      propertyTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      propertyTypeName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return PropertyType;
};