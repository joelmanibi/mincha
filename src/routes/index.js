
  resentCustomerRoutes = require('./account/customer/resent-customer-otp.routes');
  createcustomerRoutes = require('./account/customer/create-customer.routes');
  validationCustomerRoutes = require('./account/customer/validate-customer.routes');
  signinCustomerRoutes = require('./account/customer/signin-customer.routes');
  createOwnerRoutes = require('./account/owner/create-owner.routes');
  validateOwnerRoutes = require('./account/owner/validate-owner.routes');
  updateOwnerRoutes = require('./account/owner/update-owner-file.routes');
  changePasswordRoutes = require('./account/change-password.routes');
  signinOwnerRoutes = require('./account/owner/signin-owner.routes');
  getBalanceRoutes = require('./wallet/get-balance.routes');
  addPropertyRoutes = require('./property/add-property.routes');
  updateUpdateRoutes = require('./property/update-property.routes');
  deletePropertyRoutes = require('./property/delete-property.routes');
  getallPropertyRoutes = require('./property/getall-property.routes');
  getPropertyphotoRoutes = require('./property/get-property-photo.routes');
  getmyPropertyRoutes = require('./property/getmy-property.routes');
  updatePropertyRoutes = require('./property/update-property-file.routes');
  addAnnouncementRoutes = require('./announcement/add-announcement.routes');
  updateAnnouncementRoutes = require('./announcement/update-announcement.routes');
  getallAnnouncementRoutes = require('./announcement/getall-announcement.routes');
  getmyAnnouncementRoutes = require('./announcement/getmy-announcement.routes');
  deleteAnnouncementRoutes = require('./announcement/delete-announcement.routes');
  viewServiceRoutes = require('./announcement/countAnnouncementView.routes');


  module.exports = (app) => {
    resentCustomerRoutes(app);
    createcustomerRoutes(app);
    validationCustomerRoutes(app);
    signinCustomerRoutes(app);
    createOwnerRoutes(app);
    validateOwnerRoutes(app);
    updateOwnerRoutes(app);
    changePasswordRoutes(app);
    signinOwnerRoutes(app);
    getBalanceRoutes(app);
    addPropertyRoutes(app);
    updateUpdateRoutes(app);
    deletePropertyRoutes(app);
    getPropertyphotoRoutes(app);
    getmyPropertyRoutes(app);
    updatePropertyRoutes(app);
    addAnnouncementRoutes(app);
    updateAnnouncementRoutes(app);
    getallAnnouncementRoutes(app);
    getmyAnnouncementRoutes(app);
    deleteAnnouncementRoutes(app);
    viewServiceRoutes(app);
    
  };