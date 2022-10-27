// Script de connexion à la base de donnée MongoDB, d'initialisation d'un middleware et de mise en place des routes de bases

const express       = require("express");
const mongoose      = require("mongoose");
const user_routes   = require("./routes/user");
const posts_routes  = require("./routes/post");
const app           = express();

mongoose.connect("mongodb+srv://test:test22@cluster0.u1jvgd8.mongodb.net/test")
    .then( () => console.log("Connexion à MongoDB Atlas réussie !"))
    .catch(() => console.log("Connexion à MongoDB Atlas échouée !"));

app.use(express.json());

// Utilisation d'un middleware permettant de contourner des erreurs récurrentes dans l'initialisation d'une API, comme son accessibilité,
// l'ajout de headers et requêtes utilisant des méthodes spécifiques
app.use((request, response, next) =>
{
    response.setHeader('Access-Control-Allow-Origin',  '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

app.use("/api/posts",   posts_routes);
app.use("/api/auth",    user_routes);

module.exports = app;