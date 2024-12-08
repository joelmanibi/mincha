module.exports = (sequelize, Sequelize) => {
    const ProjectStatus = sequelize.define("projectstatus", {
        projectStatusId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      projectStatusName: {
        type: Sequelize.STRING,
      }
    }
  );
      return ProjectStatus;
};