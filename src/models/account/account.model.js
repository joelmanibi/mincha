module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        accountId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accounTitle: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      accountEmail: {
        type: Sequelize.STRING
      },
      accountToken: {
        type: Sequelize.STRING
      },
      accountLogo: {
        type: Sequelize.STRING
      },
      accountDoc: {
        type: Sequelize.STRING
      },
      accountIsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      accountDocTypeID: {
        type: Sequelize.INTEGER
      },
      accountTypeID: {
        type: Sequelize.INTEGER
      },
      accountIsApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      validationComment: {
        type: Sequelize.TEXT
      }
      
    }
      );
      return Account;
};