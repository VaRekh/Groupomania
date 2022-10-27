# Introduction

En réponse à la demande de Groupamania, voici le réseau social interne, créé par PAPASIDERO Lucas sur Visual Studio Code.

Vous trouverez ci-dessous les étapes à suivre pour le lancer sur votre ordinateur.<br>
Vous aurez besoin d'installer [Node.js](https://nodejs.org/fr/) (version 16.16.0 ou supérieur) ainsi que de 2 terminaux de commandes, un pour le frontend et l'autre pour le backend.

## 1 - Téléchargement

Téléchargez l'intégralité du projet. Vous devriez avoir le frontend et le backend au même niveau de dossier.<br>
Par exemple :

	C:\Users\Default\Documents\P7\frontend
	C:\Users\Default\Documents\P7\backend

## 2 - Démarrage du backend
### 2.1 - Installation des paquets de Node

A l'aide d'un terminal exécutez la commande "**npm install**" en étant localisé dans le dossier du **backend**.<br>
Par exemple :

	C:\Users\Default\Documents\P6\backend> npm install

Cela devrait installer tous les modules nécessaires au bon fonctionnement du serveur.<br>
En cas d'erreur, merci de bien vouloir vous référer à la rubrique 2.3 avant de faire l'étape 2.2.

### 2.2 - Initialisation du serveur local

A l'aide de ce même terminal, exécutez la commande "**node server.js**" en étant toujours localisé dans le dossier du **backend**.<br>
Par exemple :

	C:\Users\Default\Documents\P6\backend> node server.js

Le terminal devrait afficher les messages suivants :

    "Serveur lancé au port 3000"
    "Connexion à MongoDB Atlas réussi !"

Le serveur local devrait désormais être lancé.<br>
Laissez ce terminal de côté et ouvrez-en un autre pour les prochaines étapes.

### 2.3 - En cas d'erreur

Si la commande "**npm install**" a rencontré des erreurs, notamment sur *bcrypt*, vous pouvez exécuter les commandes suivantes :

    npm rebuild bcrypt --build-from-source
    npm cache clean --force

Ceci devrait résoudre les problèmes de *bcrypt*.<br>
Une fois fait, vous pouvez retenter de relancer la commande "**npm install**" et revenir à l'étape 2.2.

## 3 - Démarrage du frontend
### 3.1 - Installation des paquets de Node

A l'aide d'un terminal exécutez la commande "**npm install**" en étant localisé dans le dossier du **frontend**.<br>
Par exemple :

	C:\Users\Default\Documents\P6\frontend> npm install

Cela devrait installer tous les modules nécessaires au bon fonctionnement du site.<br>
En cas d'erreur, merci de bien vouloir vous référer à la rubrique 3.3 avant de faire l'étape 3.2.

### 3.2 - Initialisation du frontend

A l'aide de ce même terminal, exécutez la commande "**npm run serve**" en étant localisé dans le dossier racine du **frontend**.<br>
Par exemple :

    C:\Users\Default\Documents\P6\Web-Developer-P6-master> npm run serve

Le terminal devrait compiler pour lancer le frontend. Laissez ce terminal de côté et passez à l'étape 4.

### 3.3 - En cas d'erreur

Si la commande "**npm install**" a rencontré des erreurs, notamment sur *vue-cli-service*, vous pouvez exécuter les commandes suivantes :

    npm install -g @vue/cli-service
    npm cache clean --force

Ceci devrait résoudre les problèmes de *vue-cli-service*.<br>
Une fois fait, vous pouvez retenter de relancer la commande "**npm install**" et revenir à l'étape 3.2.

## 4 - Lancement sur navigateur

Lancez une page internet sur votre navigateur à l'adresse suivante :

    http://localhost:8080/signup     pour créer un nouveau compte,
    
ou :

    http://localhost:8080/           pour vous connectez directement.

Dans les deux cas, un lien indiqué sur la page par "Cliquez-ici !" vous permet de passer d'une page à l'autre.

## 5 - Aller plus loin

Créez un compte avec une adresse mail fictive et un mot de passe simple pour accéder au reste du contenu.<br>
Sinon, deux comptes sont déjà créés actuellement et à disposition :

| E-Mail | Mot de passe |
|:--------:|:-------------:|
| test@gmail.com | 22 |
| admin@admin.com | admin |