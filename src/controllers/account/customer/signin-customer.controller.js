require('dotenv').config(); 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../../../models");
const User = db.user;
const { Op } = require('sequelize');

exports.signinCustomer = async (req, res) => {
  
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
        const token = jwt.sign({ userId: userExist.userId }, process.env.SECRET_CONFIG, {
            expiresIn: 120 // 2 min
          });
          const secretOTP = speakeasy.generateSecret({ length: 20 });
          const OTP = speakeasy.totp({
          secret: secretOTP.base32,
          encoding: 'base32'
          });

        
      await User.update(
        { userToken: token, CodeOTP: OTP },
        { where: { userId: userExist.userId } }
      );
         // Envoyer le mail avec le OTP
     const mailOptions = {
      from: '"MINCHA" <joelmaniofficiel@gmail.com>',
      to: userExist.userEmail,
      subject: 'Verification code OTP',
      text: `Bonjour  ${userExist.userFirstname},\n\nVoici votre code temporaire : ${OTP}\n\nBest regards,\nJoel MANI\nDeveloppeur Backend`
    };

    await sendMail(mailOptions);
      
      res.status(200).json({
        message : "Veuillez consulter votre boite mail pour le code de validation",
        userToken: token,
        statutcode: 1
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };