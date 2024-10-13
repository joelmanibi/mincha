const userService = require("../userService");

exports.updateCustomer = async (req, res) => {
  const  userId  = req.userId;

  const {
    userFirstname,
    userLastname,
    userPhoneNumber,
    userEmail
  } = req.body;

  // Créer l'objet de mise à jour
  const updateData = {};
  if (userFirstname) updateData.userFirstname = userFirstname;
  if (userLastname) updateData.userLastname = userLastname;
  if (userPhoneNumber) updateData.userPhoneNumber = userPhoneNumber;
  if (userEmail) updateData.userEmail = userEmail

  try {
    const updatedUser = await userService.updateUser(userId, updateData);
    return res.status(200).json({ user: {
        userFirstname:updatedUser.userFirstname,
        userLastname:updatedUser.userFirstname,
        userPhoneNumber:updatedUser.userPhoneNumber,
        userEmail:updatedUser.userEmail
    } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
