const db = require("../../models");
const Announcement = db.announcement;
const client = require('../../../config/redis.config');

// Fonction pour voir une annonce et incrémenter les vues dans Redis
exports.countViewAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementId;

    // Incrémenter les vues dans Redis
    client.incr(`announcement:${announcementId}:views`, (err, views) => {
      if (err) return res.status(500).json({ message: 'Erreur Redis', error: err });

      res.status(200).json({ message: `Vues: ${views}` });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour synchroniser les vues de Redis vers la base de données
const syncViewsToDatabase = async () => {
  try {
    // Récupérer toutes les annonces depuis la base de données
    const announcements = await Announcement.findAll();

    // Boucle à travers chaque annonce et récupère ses vues depuis Redis
    for (const announcement of announcements) {
      client.get(`announcement:${announcement.announcementId}:views`, async (err, views) => {
        if (views) {
          // Mise à jour de la base de données
          announcement.announcementView += parseInt(views, 10);
          await announcement.save();

          // Supprimer les vues de Redis après la synchronisation
          client.del(`announcement:${announcement.announcementId}:views`);
        }
      });
    }
  } catch (error) {
    console.error('Erreur lors de la synchronisation des vues:', error);
  }
};

// Appel périodique pour synchroniser Redis avec la base de données (toutes les 5 minutes)
setInterval(syncViewsToDatabase, 5 * 60 * 1000);