const express = require('express');
const router = express.Router();
const Avenger = require('../models/avenger');

// get a list of avengers from the db
router.get('/avengers', (req, res, next) => {
    /* Avenger.find({}).then((avengers) => {
        res.send(avengers);
    }); */
    Avenger.aggregate().near({
        near: {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        spherical: true,
        maxDistance: 100000,
        distanceField: "dist.calculae"
    }).then((avengers) => {
        res.send(avengers);
    });
});

// add a new avenger to the db
router.post('/avengers', (req, res, next) => {
    // var avenger = new Avenger(req.body);
    // avenger.save();
    Avenger.create(req.body).then((avenger) => {
        res.send(avenger);
    }).catch(next);
});

// update an avenger in the db
router.put('/avengers/:id', (req, res, next) => {
    Avenger.findByIdAndUpdate({_id: req.params.id}, req.body).then((avenger) => {
        Avenger.findOne({_id: req.params.id}).then((avenger) => {
            res.send(avenger);
        });
    });
});

// delete an avenger from the db
router.delete('/avengers/:id', (req, res, next) => {
    Avenger.findByIdAndRemove({_id: req.params.id}).then((avenger) => {
        res.send(avenger);
    });
});

module.exports = router;