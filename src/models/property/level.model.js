module.exports = (sequelize, Sequelize) => {
    const Level = sequelize.define("level", {
      levelId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      levelName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return Level;
};