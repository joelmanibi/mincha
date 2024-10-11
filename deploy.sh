#!/bin/bash

# Afficher un message de début
echo "Démarrage du déploiement sur GitHub..."

# Chemin vers le dépôt (assurez-vous que vous êtes dans le bon répertoire)
REPO_PATH=$(pwd)

# Vérifier les modifications non suivies
if [[ -n $(git status --porcelain) ]]; then
    echo "Ajout des fichiers modifiés..."

    # Ajouter tous les fichiers modifiés
    git add .

    # Demander un message de commit
    echo "Entrez le message de commit : "
    read COMMIT_MESSAGE

    # Créer un commit
    git commit -m "$COMMIT_MESSAGE"

    # Pousser les modifications vers le dépôt distant
    echo "Poussée des modifications vers GitHub..."
    git push origin main

    echo "Déploiement terminé avec succès !"
else
    echo "Aucune modification à déployer."
fi