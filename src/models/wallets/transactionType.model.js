module.exports = (sequelize, Sequelize) => {
    const TransactionType = sequelize.define("transactionType", {
      transactionTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      transactionTypeName: {
        type: Sequelize.STRING,
      }
    }
  );
      return TransactionType;
};