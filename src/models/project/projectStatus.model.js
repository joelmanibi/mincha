module.exports = (sequelize, Sequelize) => {
    const ProjectStatus = sequelize.define("projectStatus", {
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