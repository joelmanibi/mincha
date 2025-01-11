const db = require("../../models");
const User = db.user;
var bcrypt = require("bcryptjs");
const { Op } = require('sequelize');

const extractCommonUserData = (req) => {
    return {
      userFirstname: req.body.userFirstname,
      userLastname: req.body.userLastname,
      userPhoneNumber: req.body.userPhoneNumber,
      userEmail: req.body.userEmail,
      userCountry: 225,
      userPassword: bcrypt.hashSync(req.body.userPassword, 8),
      userGender: req.body.userGender,
      userIsActive: 0,
    };
    
    
  };

  // Utilitaires
/**
 * Trouver un utilisateur par sonID
 * @param {string} userId - Id de l'utilisateur a trouver
 * @returns {Promise<Object|null>} Utilisateur trouvé ou null
 */
const findUserByuserId = async (userId) => {
  return await User.findOne({
    where: {
       userId: userId 
    }
  });
};

  // Utilitaires
/**
 * Trouver un super Admin par son Id
 * @param {string} userId - Id de l'utilisateur a trouver
 * @returns {Promise<Object|null>} Utilisateur trouvé ou null
 */
const findUserSudoByuserId = async (userId) => {
  return await User.findOne({
    where: {
      userId: userId,
      userRoleID: 1,
      userTypeID: 5
    }
  });
};


 
  // Fonction pour créer un utilisateur
  const createUser = async (userData) => {
    const user = await User.create({
      ...userData, // Les données communes
      userRoleID: userData.userRoleID,
      userTypeID: userData.userTypeID,
      userProfilePhoto: userData.userProfilePhoto,
      userIdCardFront: userData.userIdCardFront,
      userIdCardBack: userData.userIdCardBack,
      userIdCardType: userData.userIdCardType,
      userAccount: userData.userAccount
    });
    return user;
  };

  const updateUser = async (userId, updateData) => {
    try {
      const [updated] = await User.update(updateData, {
        where: { userId }
      });
  
      if (updated) {
        return await User.findOne({ where: { userId } });
      } else {
        throw new Error("Utilisateur non trouvé");
      }
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    updateUser,
    extractCommonUserData,
    createUser,
    findUserByuserId,
    findUserSudoByuserId
  };