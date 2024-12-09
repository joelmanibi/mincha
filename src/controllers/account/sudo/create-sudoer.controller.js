require('dotenv').config(); 
const { extractCommonUserData, createUser } = require('../userService');
const { sendMail } = require('../../mailService');

exports.createSudoer = async (req, res) => {
    try {
        const commonData = extractCommonUserData(req);
        const userData = {
            ...commonData,
            userAccount: null,
            userRoleID: 1,
            userTypeID: 5,
            userProfilePhoto: null,
            userIdCardFront: null,
            userIdCardBack:null,
            userIdCardType: null
          };
          
        const user = await createUser(userData);
         
      // Envoyer le mail avec le OTP
     const mailOptions = {
        from: '"MINCHA" <joelmaniofficiel@gmail.com>',
        to: user.userEmail,
        subject: 'Votre mot de passe Super Admin',
        text: `Bonjour  ${user.userFirstname},\n\nVoici votre mot de passe super Admin : ${req.body.userPassword}\n Vous pouvez le changer apres votre connexion\nBest regards,\nJoel MANI\nDeveloppeur Backend`
      };
  
      await sendMail(mailOptions);
  
      res.status(200).json({
        message : "Le compte a été crée avec succes merci de valider"
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };