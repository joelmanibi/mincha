const dotenv = require('dotenv');
const mode = process.env.NODE_ENV || 'development';

// Charger les variables d'environnement du bon fichier .env
dotenv.config({ path: mode === 'production' ? '.prod.env' : '.env' });

const environment = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = environment;
