const db = require("../../models");
const Wallet = db.wallet;
var bcrypt = require("bcryptjs");


  // Fonction pour créer un utilisateur
  const createWallet = async (walletData) => {
    const wallet = await Wallet.create({
        walletUser: walletData.walletUser,
        balance: 0
    });
  
    return wallet;
  };
  
  module.exports = {
    createWallet
  };