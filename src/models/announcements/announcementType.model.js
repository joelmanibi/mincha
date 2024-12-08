module.exports = (sequelize, Sequelize) => {
    const AnnouncementType = sequelize.define("announcementtype", {
        announcementTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      announcementTypeName: {
        type: Sequelize.STRING,
      }
    }
  );
      return AnnouncementType;
};