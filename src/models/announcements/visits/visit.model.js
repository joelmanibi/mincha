module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visit", {
      VisitId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      propertyAnnouncement: {
        type: Sequelize.INTEGER,
      },
      clientId : {
        type: Sequelize.INTEGER,
      },
      visitScheduledDate: {
        type: Sequelize.DATE,
      },
      visitScheduledHour: {
        type: Sequelize.TIME,
      }
    }
  );
      return Visit;
};