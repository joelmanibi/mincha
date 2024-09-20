module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userFirstname: {
        type: Sequelize.STRING
      },
      userLastname: {
        type: Sequelize.STRING
      },
      userPhoneNumber: {
        type: Sequelize.STRING
      },
      userEmail: {
        type: Sequelize.STRING
      },
      userCountry: {
        type: Sequelize.INTEGER
      },
      userAccount: {
        type: Sequelize.INTEGER
      },
      userRoleID: {
        type: Sequelize.INTEGER
      },
      userTypeID: {
        type: Sequelize.INTEGER
      },
      userPassword: {
        type: Sequelize.STRING
      },
      userToken: {
        type: Sequelize.STRING
      },
      userProfilePhoto: {
        type: Sequelize.STRING
      },
      userIdCardFront: {
        type: Sequelize.STRING
      },
      userIdCardBack: {
        type: Sequelize.STRING
      },
      userIsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userIdCardType: {
        type: Sequelize.INTEGER
      },
      userGender: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      CodeOTP: {
        type: Sequelize.INTEGER
      }
    }
      );
      return User;
};