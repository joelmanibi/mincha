require('dotenv').config(); 
var jwt = require("jsonwebtoken");
const db = require("../../../models");
const User = db.user;
const { extractCommonUserData, createUser } = require('../userService');
const { sendMail } = require('../../mailService');
const speakeasy = require('speakeasy');

exports.createCustomer = async (req, res) => {
  
    try {
        const commonData = extractCommonUserData(req);
        
        const userData = {
            ...commonData,
            userAccount: null,
            userRoleID: 5,
            userTypeID: 4,
            userProfilePhoto: null,
            userIdCardFront: null,
            userIdCardBack:null,
            userIdCardType: null
          };
          
        const user = await createUser(userData);

        const token = jwt.sign({ userId: user.userId }, process.env.SECRET_CONFIG, {
            expiresIn: 1200 // 20 min
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
      // Envoyer le mail avec le OTP
     const mailOptions = {
        from: '"MINCHA" <joelmaniofficiel@gmail.com>',
        to: user.userEmail,
        subject: 'Verification code OTP',
        text: `Bonjour  ${user.userFirstname},\n\nVoici votre code temporaire : ${OTP}\n\nBest regards,\nJoel MANI\nDeveloppeur Backend`
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