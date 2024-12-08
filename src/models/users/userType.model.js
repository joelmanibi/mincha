module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("usertype", {
      userTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userTypeName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return UserType;
};