const config = require("../../../../config/auth.config");
var jwt = require("jsonwebtoken");
const db = require("../../../models");
const { sendMail } = require('../../mailService');
const User = db.user;
const Account = db.account;
const Wallet = db.wallet;
const Transaction = db.transaction;

exports.validateOwner = async (req, res) => {

  if (req.body.accountIsApproved == 1) {
    try {
        const user = await User.findOne({
          where: {
            userId: req.body.userId
          }
        });
        if (!user) {
          return res.status(403).send({
            message: "Ce utilisateur n'existe pas dans la base"
          });
        }
        
        const user_token = jwt.sign({ userId: user.userId }, config.secret, {
            expiresIn: 2592000 // 30 jours
          });

        const account_token = jwt.sign({ userId: user.userAccount }, config.secret, {
          expiresIn: 2592000 // 30 jours
        });
        
      await User.update(
        { userToken: user_token, CodeOTP: 0,userIsActive: 1 },
        { where: { userId: user.userId } }
      );
      
      await Transaction.create(
        { transactionUser : user.userAccount,
          transactionAmount : req.body.firstWallet,
          transactionTypeID: 2,
          description:"Premier rechargement"
        }
      );
    const  getUserbalance = await Wallet.findOne({
      where: {
        walletUser : user.userAccount
      }
    });
    const newBalance = Number(getUserbalance.balance) + Number(req.body.firstWallet)

      await Wallet.update(
        { balance: newBalance},
        { where: { walletUser: user.userAccount } }
      );

      await Account.update(
        { accountToken: account_token,
          accountIsApproved: req.body.accountIsApproved,
          validationComment: req.body.validationComment ? req.body.validationComment : null
        },
        { where: { accountId : user.userAccount } }
      );

      // Envoyer le mail 
    const mailOptions = {
      from: '"MINCHA" <joelmaniofficiel@gmail.com>',
      to: user.userEmail,
      subject: 'Approbation de Compte!',
      text: `Bonjour ${user.userFirstname},
      \n\nNous avons le plaisir de vous informer que votre compte sur MINCHA PRO a été approuvé \n
      avec succès. Vous pouvez désormais profiter de toutes les fonctionnalités offertes par notre plateforme\n
      \n\n
      Best regards,\n L'équipe MINCHA`
    };
    
    await sendMail(mailOptions);
      res.status(200).json({
        message : "Demande traité avec succes"
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  else
  {
    const user = await User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (!user) {
      return res.status(403).send({
        message: "Ce utilisateur n'existe pas dans la base"
      });
    }
    await Account.update(
      { 
        validationComment: req.body.validationComment ? req.body.validationComment : null
      },
      { where: { accountId : user.userAccount } }
    );

        // Envoyer le mail 
        const mailOptions = {
          from: '"MINCHA" <joelmaniofficiel@gmail.com>',
          to: user.userEmail,
          subject: 'Mise à Jour de Votre Demande de Compte',
          text: `Bonjour ${user.userFirstname},
          \n\nNous vous remercions d'avoir soumis une demande de création de compte sur MINCHA PRO \n
          Après une première évaluation, nous avons remarqué que certaines informations ou documents requis n'ont pas été fournis.
          
          \n Raison : \n
          ${req.body.validationComment}
          \n\n
          Best regards,\n L'équipe MINCHA`
        };
    
        await sendMail(mailOptions);
    
    res.status(200).json({
      message : "Demande traité avec succes",
      statutcode: 1
    });

    }
  };