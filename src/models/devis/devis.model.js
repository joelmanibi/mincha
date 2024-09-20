module.exports = (sequelize, Sequelize) => {
    const Devis = sequelize.define("devis", {
        devisId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
      deviStatus: {
        type: Sequelize.INTEGER
      },
      devisTotal: {
        type: Sequelize.INTEGER
      }
    });
  
    return Devis;
  };
  