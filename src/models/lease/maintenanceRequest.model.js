module.exports = (sequelize, Sequelize) => {
    const MaintenanceRequest = sequelize.define("maintenancerequest", {
        requestId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      requestContract : {
        type: Sequelize.INTEGER
      },
      requestDescription :{
        type: Sequelize.TEXT
      },
      requestPhoto :{
        type: Sequelize.STRING
      },
      validationDate: {
        type:Sequelize.DATE
      },
      interventionDate:{
        type:Sequelize.DATE
      },
      maintenanceAmount : {
        type : Sequelize.INTEGER
      },
      requestStatusID: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      resolvedPhoto :{
        type: Sequelize.STRING
      },
      resolvedDate :{
        type: Sequelize.DATE
      },
    }
  );
      return MaintenanceRequest;
};