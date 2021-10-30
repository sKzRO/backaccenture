// Imports
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
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
    const topics = db.collection('topics');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.listen(port, () => {
      console.log(`Example app listening at http://${hostname}:${port}`);
    });

    // Rutele pentru mongo
    // PLACES
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
  
        console.log(req.query.id);
        const id = req.query.id;

        places
          .find({id: parseInt(id)})
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
                website: req.body.website,
                addedBy: req.body.uid
              };
    
              places.insertOne(place, (err, result) => {
                    console.log(result);
                    res.send(result)
              })
        });
  
      });

    //   RESTAURANTS
      app.get('/getrestaurants', function (req, res) {
  
        restaurants
          .find()
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch((error) => console.error(error));
      });

      app.get('/getrestaurant', function (req, res) {
  
        console.log(req.query.id);
        const id = req.query.id;

        restaurants
          .find({id: parseInt(id)})
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch((error) => console.error(error));
      });

    app.post('/addrestaurant', function (req, res) {

        restaurants.countDocuments().then((currentId) => {
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
                website: req.body.website,
                addedBy: req.body.uid
              };
    
              restaurants.insertOne(place, (err, result) => {
                    console.log(result);
                    res.send(result)
              })
        });
  
      });


      //   LOCAL CUSTOMS
      app.get('/getlocalcustoms', function (req, res) {
  
        localcustoms
          .find()
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch((error) => console.error(error));
      });

      app.get('/getlocalcustom', function (req, res) {
  
        console.log(req.query.id);
        const id = req.query.id;

        localcustoms
          .find({id: parseInt(id)})
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch((error) => console.error(error));
      });

    app.post('/addlocalcustom', function (req, res) {

        localcustoms.countDocuments().then((currentId) => {
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
                website: req.body.website,
                addedBy: req.body.uid
              };
    
              localcustoms.insertOne(place, (err, result) => {
                    console.log(result);
                    res.send(result)
              })
        });
  
      });


            //   LOCAL CUSTOMS
            app.get('/getlocallaws', function (req, res) {
  
                locallaws
                  .find()
                  .toArray()
                  .then((results) => {
                    res.send(results);
                  })
                  .catch((error) => console.error(error));
              });
        
              app.get('/getlocallaw', function (req, res) {
          
                console.log(req.query.id);
                const id = req.query.id;
        
                locallaws
                  .find({id: parseInt(id)})
                  .toArray()
                  .then((results) => {
                    res.send(results);
                  })
                  .catch((error) => console.error(error));
              });
        
            app.post('/addlocallaw', function (req, res) {
        
                locallaws.countDocuments().then((currentId) => {
                    const place = {
                        id: currentId+1,
                        title: req.body.title,
                        description: req.body.description,
                        article: req.body.article,
                        year: req.body.year,
                        category: req.body.category,
                        addedBy: req.body.uid
                      };
            
                      locallaws.insertOne(place, (err, result) => {
                            console.log(result);
                            res.send(result)
                      })
                });
          
              });


            //   EVENTS
            app.get('/getevents', function (req, res) {
  
                events
                  .find()
                  .toArray()
                  .then((results) => {
                    res.send(results);
                  })
                  .catch((error) => console.error(error));
              });
        
              app.get('/getevent', function (req, res) {
          
                console.log(req.query.id);
                const id = req.query.id;
        
                events
                  .find({id: parseInt(id)})
                  .toArray()
                  .then((results) => {
                    res.send(results);
                  })
                  .catch((error) => console.error(error));
              });
        
            app.post('/addevent', function (req, res) {
        
                events.countDocuments().then((currentId) => {
                    const place = {
                        id: currentId+1,
                        title: req.body.title,
                        description: req.body.description,
                        article: req.body.article,
                        date: req.body.year,
                        category: req.body.category,
                        addedBy: req.body.uid
                      };
            
                      events.insertOne(place, (err, result) => {
                            console.log(result);
                            res.send(result)
                      })
                });
          
              });

            //   Topics
            app.get('/getTopics', function (req, res) {
  
                topics
                  .find()
                  .toArray()
                  .then((results) => {
                    res.send(results);
                  })
                  .catch((error) => console.error(error));
              });
        
              app.get('/getTopic', function (req, res) {
          
                console.log(req.query.id);
                const id = req.query.id;
        
                topics
                  .find({id: parseInt(id)})
                  .toArray()
                  .then((results) => {
                    res.send(results);
                  })
                  .catch((error) => console.error(error));
              });
        
            app.post('/addTopic', function (req, res) {
        
                topics.countDocuments().then((currentId) => {
                    const place = {
                        id: currentId+1,
                        title: req.body.title,
                        question: req.body.question,
                        date: "2021",
                        category: req.body.category,
                        addedBy: req.body.uid,
                        answears: []
                      };
            
                      topics.insertOne(place, (err, result) => {
                            console.log(result);
                            res.send(result)
                      })
                });
          
              });

              app.post('/addAnswear', function (req, res) {

                const id = req.body.id;
                const addedBy = req.body.uid;
                const answear = req.body.answear;


                topics
                    .find({id: parseInt(id)})
                    .toArray()
                    .then((results) => {
                        if (!results.answears) {
                            const currentAnswear = {
                                addedBy: addedBy,
                                answear: answear
                            }
                            const vector = [];
                            vector[0] = currentAnswear;
                            topics.updateOne({
                                id: id
                            }, {
                                $set: {
                                    answears : vector
                                }
                            }).then(() => {
                                res.send("gol")
                            })
                        } else {
                            res.send(results.answears);
                        }
                    })
                    .catch((error) => console.error(error));
        
          
              });

    // Rutele pentru firebase
       // FIREBASE
       var config = {
        apiKey: process.env.APIKEY_FIREBASE,
        authDomain: process.env.AUTHDOMAIN_FIREBASE,
        databaseURL: process.env.DATABASEURL_FIREBASE,
      };
    //   admin.initializeApp(config);



}).catch(console.error);
