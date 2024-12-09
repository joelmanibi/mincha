require('dotenv').config(); 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../../../models");
const User = db.user;
const dotenv = require('dotenv');

exports.signinSudo = async (req, res) => {
    try {
        const userExist = await User.findOne({
          where: {
             userEmail: req.body.userPhoneOrEmail
          }
        });

        if (!userExist) {
          return res.status(403).send({
            message: "Numero de telephone ou Email n'est pas disponible dans la base"
          });
        };

        const usersIsudo = await User.findOne({
            where: {
                userId: userExist.userId,
                userRoleID: process.env.SUDO_ID
            }
          });
  
          if (!usersIsudo) {
            return res.status(403).send({
              message: "Vous n'etes pas autorisé a vous authentifier"
            });
          };

        var passwordIsValid = bcrypt.compareSync(
            req.body.userPassword,
            userExist.userPassword
          );

          if (!passwordIsValid) {
            return res.status(403).send({
              message: "Le mot de passe est incorrecte"
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

        const token = jwt.sign({ userId: userExist.userId }, process.env.SECRET_CONFIG, {
            expiresIn: 7200 
          });
   
      await User.update(
        { userToken: token },
        { where: { userId: userExist.userId } }
      );

      res.status(200).json({
        userToken: token,
        userFirstname: userExist.userFirstname,
        userLastname: userExist.userLastname,
        userPhoneNumber: userExist.userPhoneNumber,
        userEmail: userExist.userEmail,
        userRoleID:userExist.userRoleID
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };