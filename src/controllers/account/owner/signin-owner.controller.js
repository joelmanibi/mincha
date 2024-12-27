const config = require("../../../../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../../../models");
const Account = db.account;
const User = db.user;
const { Op } = require('sequelize');

exports.signinOwner = async (req, res) => {
  
    try {
        const userExist = await User.findOne({
          where: {
            [Op.or]: [
              { userEmail: req.body.userPhoneOrEmail },
              { userPhoneNumber: req.body.userPhoneOrEmail }
            ]
          }
        });
        if (!userExist) {
          return res.status(403).send({
            message: "Numero de telephone ou Email n'est pas disponible dans la base"
          });
        };
        
        const userIsActived = await User.findOne({
          where: {
               userId: userExist.userId,
               userIsActive: 1,
          }
        });
        if (!userIsActived) {
          return res.status(403).send({
            message: "Ce compte est desactivé"
          });
        };

        const userIsOwner = await User.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  { userTypeID: 1 },
                  { userTypeID: 2 },
                  { userTypeID: 3 },
                  { userRoleID: 3 }
                ]
              },
              {
                userId: userExist.userId 
              }
            ]
          }
        });
        if (!userIsOwner) {
          return res.status(403).send({
            message: "Vous n'etes pas authorisé a acceder a la version PRO de MINCHA"
          });
        };
        var passwordIsValid = bcrypt.compareSync(
          req.body.userPassword,
          userExist.userPassword
        );
      
        if (!passwordIsValid) {
          return res.status(401).json({
            message: "Oups! Mot de passe incorrect!!",
            statutcode: 0
          });
        };

        const accountExist = await Account.findOne({
          where: {
            accountId: userExist.userAccount
          }
        });
        
      
      res.status(200).json({
        userToken: userExist.userToken,
        accountToken: accountExist.accountToken,
        userFirstname: userExist.userFirstname,
        userLastname: userExist.userLastname,
        userPhoneNumber: userExist.userPhoneNumber,
        userEmail: userExist.userEmail
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };