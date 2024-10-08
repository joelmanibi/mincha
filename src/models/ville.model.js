module.exports = (sequelize, Sequelize) => {
    const Ville = sequelize.define("ville", {
      villeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      villeName: {
        type: Sequelize.STRING,
      }
    }
  );
      return Ville;
};