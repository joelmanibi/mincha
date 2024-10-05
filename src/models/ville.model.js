module.exports = (sequelize, Sequelize) => {
    const Ville = sequelize.define("ville", {
      villeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      vileName: {
        type: Sequelize.STRING,
      }
    }
  );
      return Ville;
};