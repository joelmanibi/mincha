const db = require("../../models");
const Wallet = db.wallet;
const User = db.user;

exports.getBalance = async (req, res) => {
  
    try {
        const user = await User.findOne({
            where: {
                userId: req.userId,
            }
          });
        const wallet = await Wallet.findOne({
            where: {
                walletUser: user.userAccount,
            }
          });

          if (!wallet) {
            return res.status(401).json({
              message: "Aucun compte ou portefeuil trouvé",
              statutcode: 0
            });
          }
      
      res.status(200).json({
       balance:wallet.balance,
        statutcode: 1
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };