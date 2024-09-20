module.exports = (sequelize, Sequelize) => {
    const Month = sequelize.define("month", {
      monthId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      monthName: {
        type: Sequelize.STRING,
      }
    }
  );
      return Month;
};