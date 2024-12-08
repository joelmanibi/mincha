module.exports = (sequelize, Sequelize) => {
    const PropertyPhoto = sequelize.define("propertyphoto", {
        propertyPhotoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      propertyPhotoName: {
        type: Sequelize.STRING,
      },
      propertyID: {
        type: Sequelize.INTEGER,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return PropertyPhoto;
};