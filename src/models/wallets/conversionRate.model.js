module.exports = (sequelize, Sequelize) => {
    const ConversionRate = sequelize.define("conversionRate", {
      ConversionRateId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      currency_code : {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.INTEGER,
      }
    }
  );
      return ConversionRate;
};