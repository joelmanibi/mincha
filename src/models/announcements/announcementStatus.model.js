module.exports = (sequelize, Sequelize) => {
    const AnnouncementStatus = sequelize.define("announcementstatus", {
      AnnouncementStatusId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      AnnouncementStatusName: {
        type: Sequelize.STRING,
      }
    }
  );
      return AnnouncementStatus;
}; 