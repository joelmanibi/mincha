// deleteFileService.js
const fs = require('fs');
const path = require('path');

// Fonction pour supprimer un fichier
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`Deleted: ${filePath}`);
      }
    });
  });
};

module.exports = deleteFile;
