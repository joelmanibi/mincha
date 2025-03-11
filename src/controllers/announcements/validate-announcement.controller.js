
const db = require("../../models");
const { sendMail } = require('../mailService');
const User = db.user;
const Announcement = db.announcement;
const Property = db.property;

exports.validateAnnouncement = async (req, res) => {

  const requesterIsAdmin = await User.findOne({
    where: {
      userId: req.userId,
      userRoleID: 1,
      userTypeID: 5
    }
  });
  if (!requesterIsAdmin) {
    return res.status(403).send({
      message: "Vous n'etes pas authorisé a éffectuer cette requete, merci de contacter l'administrateur pour support",
    });
  };
  if (req.body.announcementApproved == 3) {
    try {
        const announcement = await Announcement.findOne({
          where: {
            announcementId: req.body.announcementId
          },
          include: [
            {
                model: Property
            }
        ],

        });
        if (!announcement) {
          return res.status(200).send({
            message: "Cette annonce n'existe pas dans la base"
          });
        }

        const user = await User.findOne({
            where: {
                userAccount: announcement.property.ownerId
            }
          });


      await Announcement.update(
        {  announcementStatusID: req.body.announcementApproved },
        { where: { announcementId: req.body.announcementId } }
      );
      

      // Envoyer le mail 
    const mailOptions = {
      from: '"MINCHA" <joelmaniofficiel@gmail.com>',
      to: user.userEmail,
      subject: 'Approbation de Compte!',
      text: `Bonjour ${user.userFirstname},
      \n\nNous avons le plaisir de vous informer que votre annonce a été approuvé \n
      avec succès. 
      \n\n
      Best regards,\n L'équipe MINCHA`
    };
    
    await sendMail(mailOptions);
      res.status(200).json({
        message : "Propriété validé avec succes"
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  else
  {
    try {
      const announcement = await Announcement.findOne({
        where: {
          announcementId: req.body.announcementId
        },
        include: [
          {
              model: Property
          }
      ],

      });
      if (!announcement) {
        return res.status(200).send({
          message: "Cette annonce n'existe pas dans la base"
        });
      }

      const user = await User.findOne({
          where: {
              userAccount: announcement.property.ownerId
          }
        });


    await Announcement.update(
      {  announcementStatusID: req.body.announcementApproved },
      { where: { announcementId: req.body.announcementId } }
    );
    
    const mailOptions = {
      from: '"MINCHA" <joelmaniofficiel@gmail.com>',
      to: user.userEmail,
      subject: 'Mise à Jour de Votre Demande de Compte',
      text: `Bonjour ${user.userFirstname},
      \n\nNous vous remercions d'avoir soumis une demande d'ajout d'annonce sur MINCHA PRO \n
      Après une première évaluation, nous avons remarqué que certaines informations ou documents requis n'ont pas été fournis.
      
      \n Raison : \n
      \n\n
      Best regards,\n L'équipe MINCHA`
    };

    await sendMail(mailOptions);

res.status(200).json({
  message : "Demande rejeté avec succes"
});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
        // Envoyer le mail 
        

    }
  };