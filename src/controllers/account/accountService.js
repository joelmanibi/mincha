const db = require("../../models");
const Account = db.account;
var bcrypt = require("bcryptjs");

const extractCommonAccountData = (req) => {
    return {
      accounTitle: req.body.accounTitle ? req.body.accounTitle : req.body.userFirstname + " " + req.body.userLastname,
      accountNumber: req.body.accountNumber ? req.body.accountNumber : req.body.userPhoneNumber,
      accountEmail: req.body.accountEmail ? req.body.accountEmail : req.body.userEmail,
      accountIsActive: 1,
      accountIsApproved: 0
    };
  };
  // Fonction pour créer un utilisateur
  const createAccount = async (accountData) => {
    const account = await Account.create({
      ...accountData, // Les données communes
      accountDocTypeID: accountData.accountDocTypeID,
      accountTypeID: accountData.accountTypeID,
      accountLogo: accountData.accountLogo,
      accountDoc: accountData.accountDoc
    });
  
    return account;
  };
  
  module.exports = {
    extractCommonAccountData,
    createAccount,
  };