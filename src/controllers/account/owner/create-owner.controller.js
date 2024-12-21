require('dotenv').config(); 
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const User = db.user;
const { extractCommonAccountData, createAccount } = require('../accountService');
const { extractCommonUserData, createUser } = require('../userService');
const { createWallet } = require('../../wallet/walletService');
const { sendMail } = require('../../mailService');
const uploadProfile = require("../../../../helpers/user/uploadFileService");
const util = require('util');

exports.createOwner = async (req, res) => {
  const upload = util.promisify(uploadProfile.fields([
    { name: 'profile_file', maxCount: 1 },
    { name: 'idCardFront_file', maxCount: 1 },
    { name: 'logo_file', maxCount: 1 },
    { name: 'doccument_file', maxCount: 1 },
    { name: 'idCardBack_file', maxCount: 1 }
  ]));

  try {
    await upload(req, res);
    await checkDuplicateUser(req, res);
    const commonAccountData = extractCommonAccountData(req);

    const accountData = {
      ...commonAccountData,
      accountDocTypeID: req.body.accountDocTypeID ? req.body.accountDocTypeID : null,
      accountTypeID: req.body.accountTypeID,
      accountLogo: req.files['logo_file'] ? req.files['logo_file'][0].filename : null,
      accountDoc: req.files['doccument_file'] ? req.files['doccument_file'][0].filename : null,
    };

    const account = await createAccount(accountData);
    const walletData = {
      walletUser: account.accountId
    };
    await createWallet(walletData);

    const commonData = extractCommonUserData(req);
    
    const userData = {
      ...commonData,
      userAccount: account.accountId,
      userRoleID: 3,
      userTypeID: req.body.userTypeID,
      userProfilePhoto: req.files['profile_file'] ? req.files['profile_file'][0].filename : null,
      userIdCardFront: req.files['idCardFront_file'] ? req.files['idCardFront_file'][0].filename : null,
      userIdCardBack: req.files['idCardBack_file'] ? req.files['idCardBack_file'][0].filename : null,
      userIdCardType: req.body.userIdCardType
    };

    const user = await createUser(userData);

    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_CONFIG, {
      expiresIn: 259200 // (en s) 3 jours
    });

    await User.update(
      { userToken: token },
      { where: { userId: user.userId } }
    );

    // Envoyer le mail avec le OTP
    const mailOptions = {
      from: '"MINCHA" <joelmaniofficiel@gmail.com>',
      to: user.userEmail,
      subject: 'Bienvenue chez MINCHA !',
      text: `Bonjour ${user.userFirstname},
      \n\nNous sommes ravis de vous accueillir chez MINCHA, votre nouvelle plateforme de gestion de biens immobiliers !\n
      Votre inscription a été réalisée avec succès. Nous vous remercions de rejoindre notre communauté.\n
      Votre compte est actuellement en attente de validation. Une fois votre compte validé, vous pourrez accéder à toutes les fonctionnalités de notre application, y compris : \n\n
      - Gestion de vos biens immobiliers \n
      - Publication d'annonces de vente ou de location \n
      - Réception de demandes de visite pour les biens postés \n
      - Et bien plus encore ! \n
      Quoi faire ensuite ? \n\n
      1. Attendez la validation de votre compte. \n
      2. Une fois validé, connectez-vous et complétez votre profil. \n
      3. Explorez nos fonctionnalités et commencez à utiliser MINCHA. \n\n
      Best regards,\n L'équipe MINCHA`
    };

    await sendMail(mailOptions);

    res.status(200).json({
      message: "Bienvenue chez MINCHA PRO",
      userToken: token,
      userFirstname: user.userFirstname,
      userLastname: user.userLastname,
      userPhoneNumber: user.userPhoneNumber,
      userEmail: user.userEmail,
      accounTitle: req.body.accounTitle ? req.body.accounTitle : req.body.userFirstname + " " + req.body.userLastname,
      accountNumber: req.body.accountNumber ? req.body.accountNumber : req.body.userPhoneNumber,
      accountEmail: req.body.accountEmail ? req.body.accountEmail : req.body.userEmail
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
