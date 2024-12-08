module.exports = (sequelize, Sequelize) => {
    const TransactionType = sequelize.define("transactiontype", {
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