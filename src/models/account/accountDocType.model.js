module.exports = (sequelize, Sequelize) => {
    const AccountDocType = sequelize.define("accountDocType", {
      accountDocTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accountDocTypeName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return AccountDocType;
};