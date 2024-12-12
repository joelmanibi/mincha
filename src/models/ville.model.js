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
    },
    {
        timestamps: false,
        // If don't want updatedAt
        updatedAt: false,
    }
  );
      return Ville;
};