module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        transactionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      transactionUser: {
        type: Sequelize.INTEGER,
      },
      transactionAmount: {
        type: Sequelize.INTEGER,
      },
      transactionTypeID: {
        type: Sequelize.INTEGER,
      },
      conversion: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
    }
  );
      return Transaction;
};