module.exports = (sequelize, Sequelize) => {
    const Announcement = sequelize.define("announcement", {
        announcementId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      announcementProperty: {
        type: Sequelize.INTEGER,
      },
      announcementCode: {
        type: Sequelize.STRING,
      },
      announcementTypeID: {
        type: Sequelize.INTEGER,
      },
      propertyPrice : {
        type: Sequelize.INTEGER,
      },
      propertyDescription : {
        type: Sequelize.TEXT,
      },
      announcementStatusID : {
        type: Sequelize.INTEGER,
      },
      announcementView : {
        type: Sequelize.INTEGER,
      }
    }
  );
      return Announcement;
};