module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
        walletId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      balance: {
        type: Sequelize.INTEGER,
      },
      walletUser: {
        type: Sequelize.INTEGER,
      },
    }
  );
      return Wallet;
};