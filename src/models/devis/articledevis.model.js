module.exports = (sequelize, Sequelize) => {
    const ArticleDevis = sequelize.define('articleDevis', {
        articleDevisId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        nomenclature: {
        type: Sequelize.STRING,
        allowNull: false
      },
      devisArticleId: {
        type: Sequelize.INTEGER
      },
      quantite: {
        type: Sequelize.INTEGER
      },
      prixUnitaire: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      }
    }, {});
  
    
    return ArticleDevis;
  };
  