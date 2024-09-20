module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("contract", {
        contractId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      propertyId : {
        type: Sequelize.INTEGER,
      },
      tenantId : {
        type: Sequelize.INTEGER,
      },
      contractEndDate : {
        type: Sequelize.DATE,
      },
      contractStartDate : {
        type: Sequelize.DATE,
      },
      contractRentAmount :{
        type : Sequelize.INTEGER
      },
      contractStatus : {
        type: Sequelize.INTEGER,
      },
      depotGarantie  : {
        type: Sequelize.INTEGER,
      },
      contratPDF : {
        type: Sequelize.STRING,
      },
      paiementDeadline : {
        type: Sequelize.INTEGER,
      }
    }
  );
      return Contract;
};