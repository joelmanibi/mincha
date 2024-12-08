module.exports = (sequelize, Sequelize) => {
    const ProjectType = sequelize.define("projecttype", {
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