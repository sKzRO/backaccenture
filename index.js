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
var database = admin.database();


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

      var ref = database.ref('users/' + req.query.uid);
      ref
          .once('value')
          .then(function (snapshot) {
            return ref.update({
              points:
                snapshot.val().points + 20,
            });
          })
          .then(() => {

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

              
              var ref = database.ref('users/' + req.query.uid);
              ref
                  .once('value')
                  .then(function (snapshot) {
                    return ref.update({
                      points:
                        snapshot.val().points + 20,
                    });
                  })
                  .then(() => {
                    events.countDocuments().then((currentId) => {
                      const place = {
                          id: currentId+1,
                          title: req.body.title,
                          image: req.body.image,
                          description: req.body.description,
                          date: req.body.date,
                          category: req.body.category,
                          addedBy: req.body.uid
                        };
              
                        events.insertOne(place, (err, result) => {
                              console.log(result);
                              res.send(result)
                        })
                  });
                }).then((e) => {
                      console.log(e)
                      res.send("gol")
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
                        date: req.body.date,
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

              app.get('/addAnswear', function (req, res) {

                const id = parseInt(req.query.id);
                const addedBy = req.query.name;
                const answear = req.query.answear;

                // Adaugam in cont

                var ref = database.ref('users/' + req.query.uid);
                  ref
                      .once('value')
                      .then(function (snapshot) {
                        return ref.update({
                          points:
                            snapshot.val().points + 20,
                        });
                      })
                      .then(() => {
                        topics.updateOne(
                          {id: id}, 
                          {$addToSet: {answears : {
                              "answear" : answear,
                              "addedBy": addedBy
                          }} }
                      ).then((e) => {
                          console.log(e)
                          res.send("gol")
                      })
                      });

        
          
              });



    // Rutele pentru firebase
       // FIREBASE
       var config = {
        apiKey: process.env.APIKEY_FIREBASE,
        authDomain: process.env.AUTHDOMAIN_FIREBASE,
        databaseURL: process.env.DATABASEURL_FIREBASE,
      };
    //   admin.initializeApp(config);

  app.get('/createuser', function (req, res) {
      const idToken = req.query.token;

      console.log(req.query);

      if (!idToken) {
        res.sendStatus(403);
      } else {
        admin
          .auth()
          .verifyIdToken(idToken)
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log(decodedToken.uid);
            // const dbRef = database.ref();
            database
              .ref('users/' + uid)
              .set({
                created: new Date().getTime(),
                email: decodedToken.email,
                name: req.query.name,
                lastLoggedIn: new Date().getTime(),
                phone: req.query.phone,
                currentLocation: req.query.currentLocation,
                newLocation: req.query.newLocation,
                uid: uid,
                points: 0,
              })
              .then(() => {
                res.send({
                    created: new Date().getTime(),
                    email: decodedToken.email,
                    lastLoggedIn: new Date().getTime(),
                    phone: req.query.phone,
                    currentLocation: req.query.currentLocation,
                    newLocation: req.query.newLocation,
                    uid: uid,
                    points: 0,
                });
              })
              .catch((error) => {
                res.send(error);
              });
          })
          .catch((e) => {
            // Handle error
            console.log(e);
            res.sendStatus(401);
          });
      }
    });

    app.get('/getuser', function (req, res) {
        const idToken = req.query.token;
  
        if (!idToken) {
          res.sendStatus(403);
        } else {
          admin
            .auth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
              const uid = decodedToken.uid;
              const dbRef = database.ref();
              var ref = database.ref('users/' + uid);
              ref
                .once('value')
                .then(function (snapshot) {
                  return ref.update({
                    lastLoggedIn: new Date().getTime(),
                  });
                })
                .then(() => {
                  dbRef
                    .child('users')
                    .child(uid)
                    .get()
                    .then((snapshot) => {
                      if (snapshot.exists()) {
                        console.log(snapshot.val());
                        res.send(snapshot.val());
                      } else {
                        console.log('No data available');
                        res.send(false);
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
            })
            .catch(() => {
              // Handle error
              res.sendStatus(401);
            });
        }
      });

}).catch(console.error);
