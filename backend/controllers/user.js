// Définitions des users_controllers (logique métiers), les fonctions permettant d'effectuer les actions désirés sur le front-end en intéraction avec l'API

const bcrypt          = require("bcrypt");
const json_web_token  = require("jsonwebtoken");
const user_models     = require("../models/user");

// Permet l'enregistrement d'un nouvel utilisateur dans la base de donnée
// Puisque l'user utilise l'user_models, la vérification de l'unicité de l'adresse-mail dans l'API est opérante
exports.SignUp = (request, response, next) =>
{
    bcrypt.hash(request.body.dataPost.password, 15)
        .then(hash =>
        {
            const user      = new user_models;
            user.email      = request.body.dataPost.email;
            user.password   = hash;

            user.save()
                .then( ()       => response.status(201).json({ message: "Nouvel utilisateur ajouté" }))
                .catch(error    => response.status(400).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));
};

// Permet à un utilisateur de se connecter au site en recherchant un user dans l'API ayant la même adresse-mail que celle inscrite dans le formulaire de connexion
// puis en vérifiant que le mot de passe rentré est bien lui-aussi identique à celui contenu dans l'API, enfin on forme un token d'authentification propre à l'user
// qui servira à garantir ses droits sur les posts qu'il a créé et pas sur celle des autres users
exports.Login = (request, response, next) =>
{
    user_models.findOne({ email: request.body.dataPost.email })
        .then(user_found =>
        {
            if (!user_found)    return response.status(401).json({ message: "Aucun compte associé à cette adresse mail"});

            bcrypt.compare(request.body.dataPost.password, user_found.password)
                .then(password_valid =>
                {
                    if (!password_valid)    return response.status(401).json({ message: "Mot de passe erroné" });
                    
                    response.status(200).json(
                    {
                        userId: user_found._id,
                        token: json_web_token.sign
                            (
                                { userId: user_found._id },
                                "Lucas",
                                { expiresIn: "2h" }
                            )
                    });
                })
                .catch(error => response.status(500).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));
};