var jwt = require("jsonwebtoken");
const db = require("../../../models");
const User = db.user;
const { sendMail } = require('../../mailService');
const speakeasy = require('speakeasy');
const { Op } = require('sequelize');
require('dotenv').config(); 

exports.resentCustomerOTP = async (req, res) => {
  
    try {

        const user = await User.findOne({
            where: {
              [Op.or]: [
                { userPhoneNumber: req.body.userPhoneNumber ?? null },
                { userEmail: req.body.userEmail }
              ]
            }
          })

        const token = jwt.sign({ userId: user.userId }, process.env.SECRET_CONFIG, {
            expiresIn: 1200 // s
          });
          
          const secretOTP = speakeasy.generateSecret({ length: 20 });
          const OTP = speakeasy.totp({
          secret: secretOTP.base32,
          encoding: 'base32'
          });

      await User.update(
        { userToken: token, CodeOTP: OTP },
        { where: { userId: user.userId } }
      );
      // Envoyer le mail avec le token
     const mailOptions = {
        from: '"MINCHA" <joelmaniofficiel@gmail.com>',
        to: user.userEmail,
        subject: 'Verification code OTP',
        text: `Bonjour  ${user.userFirstname},\n\nVoici votre code temporaire : ${OTP}\n\nBest regards,\nJoel MANI\nDeveloppeur Backend`
      };
  
      await sendMail(mailOptions);
  
      res.status(200).json({
        message : "Veuillez consulter votre boite mail pour le code de validation",
        userToken: token
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };