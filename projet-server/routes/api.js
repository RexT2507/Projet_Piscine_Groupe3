const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
const Projet = require('../models/projet');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

function verifyToken(req, res, next) 
{
    if (!req.headers.authorization)
    {
        return res.status(401).send('Demande non autorisée');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null')
    {
        return res.status(401).send('Demande non autorisée');
    }
    let playload = jwt.verify(token, 'secretKey');
    if (!playload)
    {
        return res.status(401).send('Demande non autorisée');
    }
    req.userId = playload.subject
    next()
}

router.get('/', (req, res) => {
    res.send(`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Racine de l'API</a>
    </nav>
    `);
});

router.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) 
        {
            return res.status(500).json({
                error: err
            });
        }
        else
        {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });    
            
            user.save()
                .then(result => {
                    console.log(result);
                    let playload = { subject: user._id };
                    let token = jwt.sign(playload, 'secretKey');
                    res.status(200).send({token});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })

    
});// Fin de la méthode register

router.post('/login', (req, res) => 
{
    let database = req.body

    User.findOne({email: database.email}, (err, user) => {

      if (err) 
      {
        console.log(err);    
      } 
      else 
      {
        if (!user) 
        {
          res.status(401).send('Email invalide');
        } 
        else if (!bcrypt.compare(user.password, database.password)) 
        {
          res.status(401).send('Mot de passe invalide');
        } 
        else 
        {
            let playload = { subject : user._id };
            let token = jwt.sign(playload, 'secretKey');
            res.status(200).send({token});
        }
      }

    });

}); // Fin de la méthode login

router.post('/projets/add', (req, res) => {

    const projet = new Projet({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        date: req.body.date
    });

    projet.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Demande ajoutée',
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/projets', (req, res) => {
    database.collection('projets').find().toArray((err, result) => {
        if (err) 
        {
            return res.status(500).json({
                error: err
            });
        }
        else
        {
            res.send(result);
        }
    });
});

router.get('/valid', verifyToken, (req, res) => {
   let projets = [
        {
            "_id": "1",
            "name": "Ynov VM",
            "description": "Demande de mise en place d'un site, ainsi qu'une VM Debian",
            "date": "07/10/2019",
            "valid_description": "Demande accepté mise en place en cours",
            "valid_date": "10/10/2019"
        }
   ];
   
   res.json(projets);
});

router.get('/refuse', verifyToken, (req, res) => {
    let projets = [
        {
            "_id": "1",
            "name": "Poudlard",
            "description": "Demande de mise en place d'un site de l'école de sorcier, ainsi qu'une VM Windows Server",
            "date": "10/10/2019",
            "refus_description": "Demande refusé consultez les commentaires",
            "refus_date": "10/10/2019"
        }
   ];
   
   res.json(projets);
});

module.exports = router;