module.exports = (sequelize, Sequelize) => {
    const IdCardType = sequelize.define("idCardType", {
        IdCardTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      IdCardTypeName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return IdCardType;
};