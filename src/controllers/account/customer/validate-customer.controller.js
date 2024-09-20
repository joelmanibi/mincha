const config = require("../../../../config/auth.config");
var jwt = require("jsonwebtoken");
const db = require("../../../models");
const User = db.user;

exports.validateCustomer = async (req, res) => {
  
    try {
        const user = await User.findOne({
          where: {
            userId: req.userId,
            CodeOTP :req.body.CodeOTP
          }
        });
        if (!user) {
          return res.status(403).send({
            message: "Le code OTP est incorrecte"
          });
        }
        const token = jwt.sign({ userId: user.userId }, config.secret, {
            expiresIn: 8640000 // 100 jours
          });
        
      await User.update(
        { userToken: token, CodeOTP: 0,userIsActive: 1 },
        { where: { userId: user.userId } }
      );
      
      res.status(200).json({
        userToken: token,
        statutcode: 1,
        userFirstname: user.userFirstname,
        userLastname: user.userLastname,
        userPhoneNumber: user.userPhoneNumber,
        userEmail: user.userEmail
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };