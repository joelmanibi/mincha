const db = require("../../models");
const Announcement = db.announcement;
const { client, ensureRedisConnection } = require('../../../config/redis.config');

// Fonction pour voir une annonce et incrémenter les vues dans Redis
exports.countViewAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementId;

    // S'assurer que Redis est connecté avant d'incrémenter
    await ensureRedisConnection();

    // Incrémenter les vues dans Redis
    const views = await client.incr(`announcement:${announcementId}:views`);
    res.status(200).json({ message: `Vues: ${views}` });

  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des vues:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour synchroniser les vues de Redis vers la base de données
const syncViewsToDatabase = async () => {
  try {
    await ensureRedisConnection();

    // Récupérer toutes les annonces depuis la base de données
    const announcements = await Announcement.findAll();

    // Boucle à travers chaque annonce et récupère ses vues depuis Redis
    await Promise.all(announcements.map(async (announcement) => {
      const views = await client.get(`announcement:${announcement.announcementId}:views`);

      if (views) {
        // Mise à jour de la base de données
        announcement.announcementView += parseInt(views, 10);
        await announcement.save();

        // Supprimer les vues de Redis après la synchronisation
        await client.del(`announcement:${announcement.announcementId}:views`);
      }
    }));

    console.log('Synchronisation des vues terminée.');

  } catch (error) {
    console.error('Erreur lors de la synchronisation des vues:', error);
  }
};

// Appel périodique pour synchroniser Redis avec la base de données (toutes les 5 minutes)
setInterval(syncViewsToDatabase, 5 * 60 * 1000);