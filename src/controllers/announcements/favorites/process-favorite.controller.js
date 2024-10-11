const db = require("../../../models");
const { extractFavoriteData,createFavorite,ifFavoriteExist, ifFavoriteActive,updateFavorite } = require('./favoriteService');


exports.processFavorite = async (req, res) => {
    try {
        // 1. Vérifier si le favori existe déjà
        const checkExstFavorite = await ifFavoriteExist(req);
        if (!checkExstFavorite) {
            // Si le favori n'existe pas, on le crée
            const FavoriteData = extractFavoriteData(req);
            const fullVisitData = {
                ...FavoriteData,
                favoriteActive: 1
            };
            await createFavorite(fullVisitData);
            return res.status(200).json({
                message: "Ajouté à la liste des Favoris",
                statutcode: 1
            });
        }
        // 2. Si le favori existe, vérifier s'il est actif
        const checkIsFavoriteActive = await ifFavoriteActive(req);
        if (checkIsFavoriteActive) {
            // Si le favori est actif, on le désactive
            await updateFavorite(req, 0);
            return res.status(200).json({
                message: "Retiré de la liste des Favoris",
                statutcode: 1
            });
        } else {
            // Si le favori est inactif, on le réactive
            await updateFavorite(req, 1);
            return res.status(200).json({
                message: "Ajouté à la liste des Favoris",
                statutcode: 1
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};