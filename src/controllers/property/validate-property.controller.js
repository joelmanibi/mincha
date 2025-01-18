
const db = require("../../models");
const { sendMail } = require('../../controllers/mailService');
const User = db.user;
const Property = db.property;

exports.validateProperty = async (req, res) => {

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
  if (req.body.propertyApproved == 1) {
    try {
        const property = await Property.findOne({
          where: {
            propertyId: req.body.propertyId
          }
        });
        if (!property) {
          return res.status(403).send({
            message: "Cette propriete n'existe pas dans la base"
          });
        }

        const user = await User.findOne({
            where: {
                userAccount: property.ownerId
            }
          });

          const maintenant = new Date();  
      await Property.update(
        { approverUser: req.userId, approvalDate: maintenant, propertyApproved: 1 },
        { where: { propertyId: req.body.propertyId } }
      );
      

      // Envoyer le mail 
    const mailOptions = {
      from: '"MINCHA" <joelmaniofficiel@gmail.com>',
      to: user.userEmail,
      subject: 'Approbation de Compte!',
      text: `Bonjour ${user.userFirstname},
      \n\nNous avons le plaisir de vous informer que votre propriété a été approuvé \n
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
    const property = await Property.findOne({
        where: {
          propertyId: req.body.propertyId
        }
      });
      if (!property) {
        return res.status(403).send({
          message: "Cette propriete n'existe pas dans la base"
        });
      }
      const user = await User.findOne({
        where: {
            userAccount: property.ownerId
        }
      });
      await Property.update(
        { approverUser: req.userId, propertyApproved: 0,approvalComment: req.body.approvalComment ? req.body.approvalComment : null },
        { where: { propertyId: req.body.propertyId } }
      );

        // Envoyer le mail 
        const mailOptions = {
          from: '"MINCHA" <joelmaniofficiel@gmail.com>',
          to: user.userEmail,
          subject: 'Mise à Jour de Votre Demande de Compte',
          text: `Bonjour ${user.userFirstname},
          \n\nNous vous remercions d'avoir soumis une demande d'ajout de proprité sur MINCHA PRO \n
          Après une première évaluation, nous avons remarqué que certaines informations ou documents requis n'ont pas été fournis.
          
          \n Raison : \n
          ${req.body.approvalComment}
          \n\n
          Best regards,\n L'équipe MINCHA`
        };
    
        await sendMail(mailOptions);
    
    res.status(200).json({
      message : "Demande rejeté avec succes"
    });

    }
  };