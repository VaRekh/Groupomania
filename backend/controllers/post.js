// Définitions des posts_controllers (logique métiers), les fonctions permettant d'effectuer les actions désirés sur le front-end en intéraction avec l'API

const post_models  = require("../models/post");

exports.GetUser = (request, response, next) =>
{
    let user = request.auth;
    response.status(200).json( user );
};

// Permet d'afficher tous les posts en cherchant tous les éléments de la collection
exports.GetAllPosts = (request, response, next) =>
{
    post_models.find()
        .then(posts => response.status(200).json(  posts ))
        .catch(error => response.status(400).json({ error }));
};

// Permet d'afficher les détails d'un post en cherchant l'élément correspondant dans la collection
exports.GetOnePost = (request, response, next) =>
{
    post_models.findOne({ _id: request.params.id })
        .then( post => response.status(200).json(  post  ))
        .catch(error => response.status(404).json({ error }));
};

// Permet de créer un post selon les attentes du post_models, en lui fournissant les informations entrées dans les formulaires du front-end
// et en sauvegardant ces informations en tant que nouvel élément stocké dans la collection "post"
exports.CreatePost = (request, response, next) =>
{
    const  postObject = request.body;
    delete postObject.userId;
    
    const  post = new post_models(
    {
        ...postObject,
        userId:    request.auth.userId,
        likes:      0,
        dislikes:   0
    });
    post.save()
        .then( ()    => response.status(201).json({ message: "Post ajouté" }))
        .catch(error => response.status(400).json({ error }));
};

// Permet de modifier un post en récupérant les infos contenus dans le body du front-end et en sauvegardant toutes ces modifications dans l'API
// Cette logique métier vérifie également si l'user modifiant le post est bien le même user qui l'avait créé, dans le cas contraire la modification est impossible
exports.ModifyPost = (request, response , next) =>
{
    const postObject = request.file ?
    {
        ...JSON.parse(request.body),
    } : { ...request.body };

    delete postObject.userId;

    post_models.findOne({ _id: request.params.id })
        .then(post =>
        {
            are_user_ids_differents = post.userId != request.auth.userId;

            if (are_user_ids_differents)    response.status(403).json({ message : "Vous n'êtes pas autorisé à modifier ce post" })
            else
            {
                post_models.updateOne({ _id: request.params.id }, { ...postObject, _id: request.params.id })
                    .then( ()    => response.status(200).json({ message: "Post modifié" }))
                    .catch(error => response.status(400).json({ error })); 
            }
        })
        .catch(error => response.status(400).json({ error }));
};

// Permet de supprimer un post, tant sur le front-end que dans l'API
// Cette logique métier vérifie également si l'user supprimant la post est bien le même user qui l'avait créé, dans le cas contraire la suppression est impossible
exports.DeletePost = (request, response, next) =>
{
    post_models.findOne({ _id: request.params.id })
        .then(post =>
        {
            are_user_ids_differents = post.userId != request.auth.userId;

            if (are_user_ids_differents)     response.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer ce post" })
            else
            {
                post_models.deleteOne({ _id: request.params.id})
                    .then( ()    => response.status(200).json({ message: "Post supprimé !" }))
                    .catch(error => response.status(500).json({ error }));
            }
        })
        .catch(error => response.status(500).json({ error }));
};

// Permet de gérer les likes et dislikes sur les posts, chaques users peut soit liker soit disliker et ce pour chaque post
// Un seul vote est enregistré par post, il faut recliquer sur un like ou dislike pour l'annuler
exports.Like = (request, response, next) =>
{
    let voted = request.body.like;
    const user = request.auth.userId;

    let likes_array = [];
    let dislikes_array= [];

    post_models.findOne({ _id: request.body.id })
        .then(post =>
        {
            likes_array = post.usersLiked;
            dislikes_array = post.usersDisliked;

            if (likes_array.indexOf(user) != -1 || dislikes_array.indexOf(user) != -1)
            {
                if (voted == 1)
                {
                    const index = likes_array.indexOf(user);

                    if (index > -1)   likes_array.splice(index, 1); 
                }
                else if (voted == -1)
                {
                    const index = dislikes_array.indexOf(user);

                    if (index > -1)   dislikes_array.splice(index, 1); 
                }
                voted = 0;
            }
            else
            {
                if (voted ==  1)    likes_array.push(user);
                if (voted == -1)    dislikes_array.push(user);
            }

            post_models.updateOne( { _id: request.body.id },
                                    { likes: likes_array.length, 
                                      dislikes: dislikes_array.length,
                                      usersLiked: likes_array,
                                      usersDisliked: dislikes_array,
                                      _id: request.body.id } )
                .then(  ()   => response.status(200).json({ message: "Post évalué par l'utilisateur" }))
                .catch(error => response.status(500).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));
};
