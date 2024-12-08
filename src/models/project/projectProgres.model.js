module.exports = (sequelize, Sequelize) => {
    const ProjectProgres = sequelize.define("projectprogres", {
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