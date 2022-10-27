// Schéma de la collection Mongo "User", établissant les attentes de cette collection

const mongoose      = require('mongoose');

const user_schema   = mongoose.Schema(
{
    email:      {type: String, required: true, unique: true},
    password:   {type: String, required: true}
});

module.exports = mongoose.model('User', user_schema);