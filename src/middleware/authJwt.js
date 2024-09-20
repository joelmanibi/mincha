const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Aucun token fourni!"
      });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
        
      }
      
      req.userId = decoded.userId;
      next();
    });
  };

  verifyAccountToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Aucun token fourni!"
      });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
        
      }
      
      req.accountId = decoded.userId;
      
      next();
    });
  };

  
  const authJwt = {
    verifyToken: verifyToken,
    verifyAccountToken:verifyAccountToken
  };
  module.exports = authJwt;