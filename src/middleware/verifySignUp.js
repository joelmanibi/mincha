const db = require("../models");
const User = db.user;
const Account = db.account;
const { Op } = require('sequelize');


checkDuplicateUser = (req, res, next) => {
  const userEmailLowerCase = req.body.userEmail ? req.body.userEmail.toLowerCase() : null;
  const userPhoneNumber = req.body.userPhoneNumber || null;


  if (!userEmailLowerCase && !userPhoneNumber) {
    return res.status(400).send({
      message: "Échec ! L'email ou le numéro de téléphone est requis."
    });
  }

  User.findOne({
    where: {
      [Op.or]: [
        { userPhoneNumber: userPhoneNumber },
        { userEmail: userEmailLowerCase }
      ]
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({
        message: "Échec ! Numéro de téléphone ou Email déjà utilisé !"
      });
    }
    next(); // Passer au middleware suivant si pas de doublons
  }).catch(err => {
    res.status(500).send({ message: "Erreur lors de la vérification de l'utilisateur." });
  });
};

checkDuplicateAccount = (req, res, next) => {
  const userEmailLowerCase = req.body.userEmail ? req.body.userEmail.toLowerCase() : null;
  const accountEmailLowerCase = req.body.accountEmail ? req.body.accountEmail.toLowerCase() : null;
  const accountNumber = req.body.accountNumber || req.body.userPhoneNumber || null;

  if (!accountNumber || (!accountEmailLowerCase && !userEmailLowerCase)) {
    return res.status(400).send({
      message: "Échec ! Le numéro de compte ou l'email est requis."
    });
  }

  Account.findOne({
    where: {
      [Op.or]: [
        { accountNumber: accountNumber },
        { accountEmail: accountEmailLowerCase || userEmailLowerCase }
      ]
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({
        message: "Échec ! Numéro de téléphone ou Email déjà utilisé pour ce compte !"
      });
    }
    next(); // Passer au middleware suivant si pas de doublons
  }).catch(err => {
    res.status(500).send({ message: "Erreur lors de la vérification du compte." });
  });
};


const verifySignUp = {
    checkDuplicateUser: checkDuplicateUser,
    checkDuplicateAccount : checkDuplicateAccount
  };
  module.exports = verifySignUp;