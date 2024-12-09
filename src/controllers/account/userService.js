const db = require("../../models");
const User = db.user;
var bcrypt = require("bcryptjs");

const extractCommonUserData = (req) => {
    return {
      userFirstname: req.body.userFirstname,
      userLastname: req.body.userLastname,
      userPhoneNumber: req.body.userPhoneNumber,
      userEmail: req.body.userEmail,
      userCountry: req.body.userCountry,
      userPassword: bcrypt.hashSync(req.body.userPassword, 8),
      userGender: req.body.userGender,
      userIsActive: 0,
    };
    
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
  };