module.exports = (sequelize, Sequelize) => {
    const Hour = sequelize.define("hour", {
      hourId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      hourName: {
        type: Sequelize.STRING,
      }
    }
  );
      return Hour;
};