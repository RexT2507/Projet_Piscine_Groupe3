const express = require('express');
const router = express.Router();

const User = require('../models/user');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'projetsdb';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(`${url}/${dbName}`, options);

const database = mongoose.connection;

database.once('open', _ => {
    console.log(`Connexion MongoDB: ${url}`);
    console.log(`Database: ${dbName}`);
});

database.on('error', err => {
    console.error('Erreur de connexion:', err);
});

router.get('/', (req, res) => {
    res.send(`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Racine de l'API</a>
    </nav>
    `);
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registerdUser) => {
        if (error) 
        {
            console.log(error);
        }
        else
        {
            res.status(200).send(registerdUser);
        }
    })
});

module.exports = router;