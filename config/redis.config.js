const redis = require('redis');
require('dotenv').config();

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

// Vérification de la connexion et tentative de reconnexion si nécessaire
async function ensureRedisConnection() {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.error('Erreur lors de la connexion à Redis:', error);
  }
}

module.exports = { client, ensureRedisConnection };