const jwt = require("jsonwebtoken");
require('dotenv').config(); 
const db = require("../models");

/**
 * Extract token from Authorization header (Bearer Token)
 */
const getTokenFromHeaders = (req) => {
  const authHeader = req.headers['authorization'];
  
  // Check if Authorization header exists and is in the Bearer format
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  }

  return null; // Return null if token is not present
};

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next, key) => {
  const token = getTokenFromHeaders(req);

  if (!token) {
    return res.status(403).json({
      message: "Token manquant. Accès refusé."
    });
  }

  // Verify the token with secret key
  jwt.verify(token, process.env.SECRET_CONFIG, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Token invalide ou expiré. Authentification refusée."
      });
    }

    // Attach the decoded userId or accountId to the request object
    req[key] = decoded.userId || decoded.accountId;
    next();
  });
};

/**
 * Middleware to verify user token (stores userId)
 */
const verifyUserToken = (req, res, next) => {
  verifyToken(req, res, next, 'userId');
};

/**
 * Middleware to verify account token (stores accountId)
 */
const verifyAccountToken = (req, res, next) => {
  verifyToken(req, res, next, 'accountId');
};

const authJwt = {
  verifyUserToken,
  verifyAccountToken
};

module.exports = authJwt;
