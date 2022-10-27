// Schéma de la collection Mongo "post", établissant les attentes de cette collection

const mongoose = require("mongoose");

const post_schema = mongoose.Schema(
{
    userId:         { type: String, required: true },
    description:    { type: String, required: true },
    postImage:       { type: String, required: true },
  
    likes:          { type: Number },
    dislikes:       { type: Number },
    usersLiked:     { type: Array },
    usersDisliked:  { type: Array }
});

module.exports = mongoose.model("post", post_schema);