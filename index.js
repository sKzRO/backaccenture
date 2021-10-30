// Imports
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// const firebase = require('firebase');
var admin = require('firebase-admin');



var Place = require('./Place.js');

require('dotenv').config();

// Create app
var app = express();
const port = process.env.PORT || 3000;
const hostname = 'localhost';

// Open MongoDB
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://accenture:${process.env.DB_PASSWORD}@cluster0.ibwf9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Open Firebase
var serviceAccount = require('./accenture-f4fff-firebase-adminsdk-70c3y-c06ae483a6.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://accenture-f4fff-default-rtdb.firebaseio.com/',
});


MongoClient.connect(uri, { useUnifiedTopology: true,   useNewUrlParser: true})
  .then((client) => {
    const db = client.db('Accenture');
    const places = db.collection('places');
    const restaurants = db.collection('restaurants');
    const locallaws = db.collection('locallaws');
    const localcustoms = db.collection('localcustoms');
    const events = db.collection('events');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.listen(port, () => {
      console.log(`Example app listening at http://${hostname}:${port}`);
    });

    // Rutele pentru mongo
    app.get('/getplaces', function (req, res) {
  
        places
          .find()
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch((error) => console.error(error));
      });

      app.get('/getplace', function (req, res) {
  
        places
          .find({id: req.query.id})
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch((error) => console.error(error));
      });

    app.post('/addplace', function (req, res) {


        places.countDocuments().then((currentId) => {
            const place = {
                id: currentId+1,
                title: req.body.title,
                description: req.body.description,
                rating: 0,
                ratingNumbers: 0,
                image: req.body.image,
                category: req.body.category,
                address: req.body.address,
                features: req.body.features,
                website: req.body.website
              };
    
              places.insertOne(place, (err, result) => {
                    console.log(result);
                    res.send(result)
              })
        });
  


      });


    // Rutele pentru firebase
       // FIREBASE
    //    var config = {
    //     apiKey: process.env.APIKEY_FIREBASE,
    //     authDomain: process.env.AUTHDOMAIN_FIREBASE,
    //     databaseURL: process.env.DATABASEURL_FIREBASE,
    //   };
    //   admin.initializeApp(config);

    //     // Get a reference to the database service
    //     var database = admin.database();
 
}).catch(console.error);
