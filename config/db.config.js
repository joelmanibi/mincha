let environment;

// Définir manuellement le mode d'environnement (production ou développement)
// Changez la valeur de la variable 'mode' en 'prod' ou 'dev' selon vos besoins
let mode = 'dev';

if (mode === 'prod') {
    environment = {
        HOST: "srv971.hstgr.io",
        USER: "u405557378_tiko",
        PASSWORD: "Adm3Pl2*",
        DB: "u405557378_tiko",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
} else if (mode === 'dev') {
    environment = {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "",
        DB: "mincha",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
} else {
    console.error("Mode d'environnement non reconnu. Utilisez 'prod' ou 'dev'.");
    process.exit(1);
}

module.exports = environment;