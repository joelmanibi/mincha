const config = require("../../../../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const { sendMail } = require('../../mailService');
const uploadProfile = require("../../../../helpers/user/uploadFileService");
const util = require('util');
const fs = require('fs');
const path = require('path');
const deleteFile = require('../../../../helpers/user/deleteFileService');

const User = db.user;
const Account = db.account;

exports.updateFile = async (req, res) => {
  const upload = util.promisify(uploadProfile.fields([
    { name: 'profile_file', maxCount: 1 },
    { name: 'idCardFront_file', maxCount: 1 },
    { name: 'logo_file', maxCount: 1 },
    { name: 'doccument_file', maxCount: 1 },
    { name: 'idCardBack_file', maxCount: 1 }
  ]));

  try {
    await upload(req, res);

    const user = await User.findOne({
      where: {
        userId: req.userId
      }
    });

    if (!user) {
      return res.status(403).send({
        message: "Cet utilisateur n'existe pas dans la base"
      });
    }

    // Obtenir les chemins des anciens fichiers
    const oldFilePaths = {
      userProfilePhoto: user.userProfilePhoto ? path.join('assets/account/profile_file/', user.userProfilePhoto) : null,
      userIdCardFront: user.userIdCardFront ? path.join('assets/account/user_idCard/', user.userIdCardFront) : null,
      userIdCardBack: user.userIdCardBack ? path.join('assets/account/user_idCard/', user.userIdCardBack) : null
    };

    // Obtenir les chemins des anciens fichiers de l'Account
    const account = await Account.findOne({ where: { accountId: user.userAccount } });
    const oldAccountFilePaths = {
      accountLogo: account && account.accountLogo ? path.join('assets/account/logo_file/', account.accountLogo) : null,
      accountDoc: account && account.accountDoc ? path.join('assets/account/doccument_file/', account.accountDoc) : null
    };

    let updateFields = {};
    let updateDocFields = {};
    let filesToDelete = [];

    
    // Vérifiez et mettez à jour les fichiers utilisateur
    if (req.files['profile_file']) {
      if (oldFilePaths.userProfilePhoto) {
        filesToDelete.push(oldFilePaths.userProfilePhoto);
      }
      updateFields.userProfilePhoto = req.files['profile_file'][0].filename;
    }
    
    if (req.files['idCardFront_file']) {
      if (oldFilePaths.userIdCardFront) {
        filesToDelete.push(oldFilePaths.userIdCardFront);
      }
      updateFields.userIdCardFront = req.files['idCardFront_file'][0].filename;
    }
    if (req.files['idCardBack_file']) {
      if (oldFilePaths.userIdCardBack) {
        filesToDelete.push(oldFilePaths.userIdCardBack);
      }
      updateFields.userIdCardBack = req.files['idCardBack_file'][0].filename;
    }

    // Vérifiez et mettez à jour les fichiers de l'Account
    if (req.files['logo_file']) {
      if (oldAccountFilePaths.accountLogo) {
        filesToDelete.push(oldAccountFilePaths.accountLogo);
      }
      updateDocFields.accountLogo = req.files['logo_file'][0].filename;
    }

    if (req.files['doccument_file']) {
      if (oldAccountFilePaths.accountDoc) {
        filesToDelete.push(oldAccountFilePaths.accountDoc);
      }
      updateDocFields.accountDoc = req.files['doccument_file'][0].filename;
    }

    // Supprimer les fichiers anciens seulement s'ils ont été modifiés
    await Promise.all(filesToDelete.map(file => deleteFile(file)));

    // Mettre à jour les enregistrements utilisateur
    if (Object.keys(updateFields).length > 0) {
      await User.update(updateFields, { where: { userId: user.userId } });
    }

    // Mettre à jour les enregistrements Account
    if (Object.keys(updateDocFields).length > 0) {
      await Account.update(updateDocFields, { where: { accountId: user.userAccount } });
    }

    res.status(200).json({
      message: "Mise a jour effectué",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
