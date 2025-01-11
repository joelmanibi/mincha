const db = require("../../../models");
const { findUserByuserId, findUserSudoByuserId } = require('../userService');
const deleteFile = require('../../../../helpers/user/deleteFileService');
const User = db.user;

exports.deleteUser = async (req, res) => {
  const transaction = await db.sequelize.transaction(); // Démarrage de la transaction
  try {
    // Vérification des permissions
    const requesterIsAdmin = await findUserSudoByuserId(req.userId);
    if (!requesterIsAdmin) {
      return res.status(403).send({
        message: "Vous n'êtes pas autorisé à effectuer cette requête. Contactez un administrateur.",
      });
    }

    // Vérification de l'existence de l'utilisateur cible
    const userExist = await findUserByuserId(req.params.userId);
    if (!userExist) {
      return res.status(404).send({
        message: "L'utilisateur ciblé n'existe pas dans la base de données.",
      });
    }

    // Suppression des fichiers associés
    const filesToDelete = [
      `assets/account/user_idCard/${userExist.userIdCardFront}`,
      `assets/account/user_idCard/${userExist.userIdCardBack}`,
      `assets/account/profile_file/${userExist.userProfilePhoto}`
    ];

    

    for (const filePath of filesToDelete) {
      if (!filePath.includes('null')) {
        try {
          await deleteFile(filePath);
        } catch (err) {
          console.error(`Erreur lors de la suppression de ${filePath} :`, err.message);
        }
      } else {
        console.warn(`Fichier manquant pour le chemin : ${filePath}`);
      }
    }

    // Suppression de l'utilisateur
    const userDeletion = await User.destroy({ where: { userId: req.params.userId }, transaction });
    if (!userDeletion) {
      throw new Error("La suppression de l'utilisateur a échoué.");
    }

    // Validation de la transaction
    await transaction.commit();
    res.status(200).json({
      message: "L'utilisateur a été supprimé avec succès.",
    });
  } catch (error) {
    await transaction.rollback(); // Annulation des modifications en cas d'erreur
    res.status(500).send({ message: error.message });
  }
};
