const db = require("../../models");
const Wallet = db.wallet;
const User = db.user;

exports.substBalance = async (req, res) => {
    try {
        // Trouver l'utilisateur associé
        const user = await User.findOne({
            where: {
                userId: req.userId,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        // Trouver le portefeuille associé à l'utilisateur
        const wallet = await Wallet.findOne({
            where: {
                walletUser: user.userAccount,
            },
        });

        if (!wallet) {
            return res.status(404).json({
                message: "Aucun compte ou portefeuille trouvé",
            });
        }

        // Vérifier si le solde est suffisant pour la soustraction
        if (wallet.balance < 10) {
            return res.status(400).json({
                message: "Solde insuffisant",
            });
        }

        // Calculer le nouveau solde
        const newBalance = wallet.balance - 10;

        // Mettre à jour le solde dans la base de données
        await Wallet.update(
            { balance: newBalance },
            { where: { walletUser: user.userAccount } }
        );

        // Retourner la nouvelle balance
        res.status(200).json({
            message: "Solde mis à jour avec succès",
            balance: newBalance,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur est survenue",
        });
    }
};
