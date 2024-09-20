module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
      projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clientId: {
        type: Sequelize.INTEGER
      },
      projectTypeID: {
        type: Sequelize.INTEGER
      },
      landOwned: {
        type: Sequelize.BOOLEAN
      },
      landArea: {
        type: Sequelize.INTEGER
      },
      landPlan: {
        type: Sequelize.STRING
      },
      numberOfRooms: {
        type: Sequelize.INTEGER
      },
      requirementsDescription: {
        type: Sequelize.TEXT
      },
      quotePDF: {
        type: Sequelize.STRING
      },
      quoteAmount: {
        type: Sequelize.FLOAT
      },
      applicationFeePaid: {
        type: Sequelize.BOOLEAN
      },
      projectStatusID: {
        type: Sequelize.INTEGER
      },
      projectProgresID: {
        type: Sequelize.INTEGER
      },
      
    });
  
    return Project;
  };
  