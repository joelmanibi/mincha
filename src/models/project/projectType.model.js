module.exports = (sequelize, Sequelize) => {
    const ProjectType = sequelize.define("projectType", {
        projectTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      projectTypeName: {
        type: Sequelize.STRING,
      }
    }
  );
      return ProjectType;
};