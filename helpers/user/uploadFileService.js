const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');

// Fonction pour créer des dossiers s'ils n'existent pas
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
};

// Configuration du stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'assets/';

    if (file.fieldname === 'profile_file') {
      uploadPath += 'account/profile_file/';
    } else if (file.fieldname === 'idCardFront_file' || file.fieldname === 'idCardBack_file') {
      uploadPath += 'account/user_idCard/';
    } else if (file.fieldname === 'doccument_file') {
      uploadPath += 'account/doccument_file/';
    } else if (file.fieldname === 'logo_file') {
      uploadPath += 'account/logo_file/';
    } else if (file.fieldname === 'property_photo') {
      uploadPath += 'property/photo/';
    } else if (file.fieldname === 'propertyDoc') {
      uploadPath += 'property/doc/';
    } else {
      uploadPath += 'others/'; // Pour gérer tout autre type de fichier si nécessaire
    }

    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + uniqid() + path.extname(file.originalname));
  }
});

// Initialiser multer avec la configuration de stockage
const upload = multer({ storage: storage });

module.exports = upload;
