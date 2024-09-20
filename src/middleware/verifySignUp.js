const db = require("../models");
const User = db.user;
const Account = db.account;
const { Op } = require('sequelize');


checkDuplicateUser = (req, res, next) => {
  
  User.findOne({
    where: {
      [Op.or]: [
        { userPhoneNumber: req.body.userPhoneNumber },
        { userEmail: req.body.userEmail }
      ]
    }
  }).then(user => {
    
    if (user) {
      
      res.status(400).send({
        message: "Échec ! Numéro de téléphone ou Email déjà utilisé !"
      });
      return;
    }
    
    next();
  });
};

checkDuplicateAccount = (req, res, next) => {
  
  Account.findOne({
    where: {
      [Op.or]: [
        { accountNumber: req.body.accountNumber ? req.body.accountNumber : req.body.userPhoneNumber, },
        { accountEmail: req.body.accountEmail ? req.body.accountEmail : req.body.userEmail, }
      ]
    }
  }).then(user => {
    
    if (user) {
      
      res.status(400).send({
        message: "Échec ! Numéro de téléphone ou Email déjà utilisé pour ce compte !"
      });
      return;
    }
    
    next();
  });
};


const verifySignUp = {
    checkDuplicateUser: checkDuplicateUser,
    checkDuplicateAccount : checkDuplicateAccount
  };
  module.exports = verifySignUp;