const config = require("../../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect,
      operatorsAliases: 0,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

db.user = require("./users/user.model.js")(sequelize, Sequelize);
db.userRole = require("./users/userRole.model.js")(sequelize, Sequelize);
db.userType = require("./users/userType.model.js")(sequelize, Sequelize);
db.idCardType = require("./users/idCardType.model.js")(sequelize, Sequelize);

db.account = require("./account/account.model.js")(sequelize, Sequelize);
db.accountType = require("./account/accountType.model.js")(sequelize, Sequelize);
db.accountDocType = require("./account/accountDocType.model.js")(sequelize, Sequelize);

db.property = require("./property/property.model.js")(sequelize, Sequelize);
db.propertyType = require("./property/propertyType.model.js")(sequelize, Sequelize);
db.propertyDocType = require("./property/propertyDocType.model.js")(sequelize, Sequelize);
db.propertyPhoto = require("./property/propertyPhoto.model.js")(sequelize, Sequelize);
db.level = require("./property/level.model.js")(sequelize, Sequelize);

db.announcement = require("./announcements/announcement.model.js")(sequelize, Sequelize);
db.announcementStatus = require("./announcements/announcementStatus.model.js")(sequelize, Sequelize);
db.announcementType = require("./announcements/announcementType.model.js")(sequelize, Sequelize);
db.visit = require("./announcements/visits/visit.model.js")(sequelize, Sequelize);

db.wallet = require("./wallets/wallet.model.js")(sequelize, Sequelize);
db.transaction = require("./wallets/transaction.model.js")(sequelize, Sequelize);
db.transactionType = require("./wallets/transactionType.model.js")(sequelize, Sequelize);
db.conversionRate = require("./wallets/conversionRate.model.js")(sequelize, Sequelize);

db.project = require("./project/project.model.js")(sequelize, Sequelize);
db.projectProgres = require("./project/projectProgres.model.js")(sequelize, Sequelize);
db.projectStatus = require("./project/projectStatus.model.js")(sequelize, Sequelize);
db.projectType = require("./project/projectType.model.js")(sequelize, Sequelize);


db.contract = require("./lease/contract.model.js")(sequelize, Sequelize);
db.maintenanceRequest = require("./lease/maintenanceRequest.model.js")(sequelize, Sequelize);
db.rentReceipt = require("./lease/rentReceipt.model.js")(sequelize, Sequelize);
db.requestStatus = require("./lease/requestStatus.model.js")(sequelize, Sequelize);

db.devis = require("./devis/devis.model.js")(sequelize, Sequelize);
db.articledevis = require("./devis/articledevis.model.js")(sequelize, Sequelize);

db.ville = require("ville.model.js")(sequelize, Sequelize);


/////toutes les realtion one to many
db.userRole.hasMany(db.user, { foreignKey: 'userRoleID' });
db.user.belongsTo(db.userRole,{ foreignKey: 'userRoleID'});

db.userType.hasMany(db.user, { foreignKey: 'userTypeID' });
db.user.belongsTo(db.userType,{ foreignKey: 'userTypeID'});

db.idCardType.hasMany(db.user, { foreignKey: 'userIdCardType' });
db.user.belongsTo(db.idCardType,{ foreignKey: 'userIdCardType'});

db.account.hasMany(db.user, { foreignKey: 'userAccount' });
db.user.belongsTo(db.account,{ foreignKey: 'userAccount'});

db.accountDocType.hasMany(db.account, { foreignKey: 'accountDocTypeID' });
db.account.belongsTo(db.accountDocType,{ foreignKey: 'accountDocTypeID'});

db.accountType.hasMany(db.account, { foreignKey: 'accountTypeID' });
db.account.belongsTo(db.accountType,{ foreignKey: 'accountTypeID'});

db.account.hasMany(db.wallet, { foreignKey: 'walletUser' });
db.wallet.belongsTo(db.account,{ foreignKey: 'walletUser'});

db.account.hasMany(db.transaction, { foreignKey: 'transactionUser' });
db.transaction.belongsTo(db.account,{ foreignKey: 'transactionUser'});

db.transactionType.hasMany(db.transaction, { foreignKey: 'transactionTypeID' });
db.transaction.belongsTo(db.transactionType,{ foreignKey: 'transactionTypeID'});

db.propertyType.hasMany(db.property, { foreignKey: 'propertyTypeID' });
db.property.belongsTo(db.propertyType,{ foreignKey: 'propertyTypeID'});

db.ville.hasMany(db.property, { foreignKey: 'propertyLocation' });
db.property.belongsTo(db.ville,{ foreignKey: 'propertyLocation'});

db.propertyDocType.hasMany(db.property, { foreignKey: 'propertyDocTypeID' });
db.property.belongsTo(db.propertyDocType,{ foreignKey: 'propertyDocTypeID'});

db.level.hasMany(db.property, { foreignKey: 'propertyLevel' });
db.property.belongsTo(db.level,{ foreignKey: 'propertyLevel'});

db.account.hasMany(db.property, { foreignKey: 'ownerId' });
db.property.belongsTo(db.account,{ foreignKey: 'ownerId'});

db.user.hasMany(db.property, { foreignKey: 'approverUser' });
db.property.belongsTo(db.user,{ foreignKey: 'approverUser'});

db.property.hasMany(db.propertyPhoto, { foreignKey: 'propertyID' });
db.propertyPhoto.belongsTo(db.property,{ foreignKey: 'propertyID'});

db.property.hasMany(db.announcement, { foreignKey: 'announcementProperty' });
db.announcement.belongsTo(db.property,{ foreignKey: 'announcementProperty'}); 

db.announcementType.hasMany(db.announcement, { foreignKey: 'announcementTypeID' });
db.announcement.belongsTo(db.announcementType,{ foreignKey: 'announcementTypeID'}); 

db.announcementStatus.hasMany(db.announcement, { foreignKey: 'announcementStatusID' });
db.announcement.belongsTo(db.announcementStatus,{ foreignKey: 'announcementStatusID'});

db.announcement.hasMany(db.visit, { foreignKey: 'propertyAnnouncement' });
db.visit.belongsTo(db.announcement,{ foreignKey: 'propertyAnnouncement'});

db.user.hasMany(db.visit, { foreignKey: 'clientId' });
db.visit.belongsTo(db.user,{ foreignKey: 'clientId'});

db.property.hasMany(db.contract, { foreignKey: 'propertyId' });
db.contract.belongsTo(db.property,{ foreignKey: 'propertyId'});

db.user.hasMany(db.contract, { foreignKey: 'tenantId' });
db.contract.belongsTo(db.user,{ foreignKey: 'tenantId'});

db.contract.hasMany(db.maintenanceRequest, { foreignKey: 'requestContract' });
db.maintenanceRequest.belongsTo(db.contract,{ foreignKey: 'requestContract'});

db.requestStatus.hasMany(db.maintenanceRequest, { foreignKey: 'requestStatusID' });
db.maintenanceRequest.belongsTo(db.requestStatus,{ foreignKey: 'requestStatusID'});

db.contract.hasMany(db.rentReceipt, { foreignKey: 'rentReceiptContract' });
db.rentReceipt.belongsTo(db.contract,{ foreignKey: 'rentReceiptContract'});

db.devis.hasMany(db.articledevis, { foreignKey: 'devisArticleId' });
db.articledevis.belongsTo(db.devis,{ foreignKey: 'devisArticleId'});

db.user.hasMany(db.project, { foreignKey: 'clientId' });
db.project.belongsTo(db.user,{ foreignKey: 'clientId'});

db.projectType.hasMany(db.project, { foreignKey: 'projectTypeID' });
db.project.belongsTo(db.projectType,{ foreignKey: 'projectTypeID'});

db.projectProgres.hasMany(db.project, { foreignKey: 'projectProgresID' });
db.project.belongsTo(db.projectProgres,{ foreignKey: 'projectProgresID'});

db.projectStatus.hasMany(db.project, { foreignKey: 'projectStatusID' });
db.project.belongsTo(db.projectStatus,{ foreignKey: 'projectStatusID'});

module.exports = db;