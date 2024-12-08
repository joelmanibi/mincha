module.exports = (sequelize, Sequelize) => {
    const AccountType = sequelize.define("accounttype", {
      accountTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accountTypeName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return AccountType;
};