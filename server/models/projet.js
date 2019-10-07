const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const projetSchema = new Schema({
    name: String,
    description: String,
    date: String
});

module.exports = mongoose.model('projet', projetSchema, 'projets');