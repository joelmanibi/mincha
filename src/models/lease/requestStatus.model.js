module.exports = (sequelize, Sequelize) => {
    const RequestStatus = sequelize.define("requestStatus", {
        requestStatusId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      requestStatusName: {
        type: Sequelize.STRING,
      }
    }
  );
      return RequestStatus;
};