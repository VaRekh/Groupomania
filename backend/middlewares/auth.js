// Création d'un middleware authentificateur propre à l'user correspondant, en se servant du token créer à la connexion de celui-ci

const json_web_token = require("jsonwebtoken");

module.exports = (request, response, next) =>
{
    try
    {
        const token         = request.headers.authorization.split(" ")[1];
        const decoded_token = json_web_token.verify(token, "Lucas");
        const token_user_id = decoded_token.userId;
        
        request.auth        = { userId: token_user_id };

        next();
    }
    catch (error)   {  response.status(403).json({ error });  }
};