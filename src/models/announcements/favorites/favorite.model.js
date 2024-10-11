module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define("favorite", {
        favoriteId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      favoriteAnnouncement: {
        type: Sequelize.INTEGER,
      },
      favoriteUser: {
        type: Sequelize.INTEGER,
      },
      favoriteActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    
    }
  );
      return Favorite;
}; 