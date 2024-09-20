module.exports = (sequelize, Sequelize) => {
    const RentReceipt = sequelize.define("rentReceipt", {
        rentReceiptId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rentReceiptCode: {
        type: Sequelize.STRING,
      }, 
      AmountOfPayment: {
        type: Sequelize.INTEGER,
      }, 
      rentReceiptContract: {
        type: Sequelize.INTEGER,
      },
      rentReceiptDate: {
        type: Sequelize.DATE,
      }
    }
  );
      return RentReceipt;
};