const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list
router.get('/', (req, res) => {
    Gig.findAll()
        .then(gigs => {
            console.log(gigs)
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
})
// Add a gig
router.get('/add', (req, res) => {
    // ultimately this data come from form, but now we hard-code
    const data = {
        title: 'Simple Wordpress website',
        technologies: 'wordpress, php, html, css',
        budget: '$1000',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo condimentum turpis nec blandit. Vivamus fringilla quam consequat arcu commodo luctus. Morbi dignissim consectetur sem in porta. Vivamus rhoncus in erat et varius. Phasellus vel facilisis elit. Pellentesque tincidunt facilisis erat non semper. Quisque facilisis sollicitudin facilisis.',
        contact_email: 'user2@gmail.com'
    }
    let {title, technologies, description, budget, contact_email} = data;

    // Insert into table
    Gig.create({
        title, technologies, budget, description, contact_email
    })  // Like all methods of Modul, this will return us a promise
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
})

module.exports = router;
