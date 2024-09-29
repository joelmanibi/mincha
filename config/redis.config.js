const redis = require('redis');

// Charger les variables d'environnement
require('dotenv').config();

// Initialisation du client Redis avec les variables d'environnement
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('error', (err) => {
  console.error('Erreur Redis:', err);
});

client.on('connect', () => {
  console.log('Connecté à Redis');
});

module.exports = client;
