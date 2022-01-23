const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list
router.get('/', (req, res) => {
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err))
})

// Display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add a gig
router.post('/add', (req, res) => {
    let errors = [];
    let {title, technologies, description, budget, contact_email} = req.body;

    // Validate fields
    if (!title){
        errors.push({text: 'Please add a title!'});
    }
    if (!description){
        errors.push({text: 'Please add a description!'});
    }
    if (!technologies){
        errors.push({text: 'Please add some technologies!'});
    }
    if (!contact_email){
        errors.push({text: 'Please add a contact email!'});
    }

    // Check for errors - Send back files to the form if is error on form
    if (errors.length > 0){
        res.render('add', {
            errors,
            title, technologies, budget, description, contact_email
        })
    } else {
        if (!budget) budget = 'Unknown'
        else {
            budget = `$${budget}`;
        }
        // Make lower case and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',')
        // Insert into table
        Gig.create({
            title, technologies, budget, description, contact_email
        })  // Like all methods of Modul, this will return us a promise
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err))
    }
})

module.exports = router;
