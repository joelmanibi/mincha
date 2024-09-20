module.exports = (sequelize, Sequelize) => {
    const ProjectProgres = sequelize.define("projectProgres", {
        projectProgresId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      projectProgresName: {
        type: Sequelize.STRING,
      }
    }
  );
      return ProjectProgres;
};