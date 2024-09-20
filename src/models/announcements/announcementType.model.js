module.exports = (sequelize, Sequelize) => {
    const AnnouncementType = sequelize.define("announcementType", {
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