const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database')

// Test
  try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express();

// Gig routes
app.use('/gigs', require('./routes/gigs'));

app.get('/', (req, res) => {
    res.send('INDEX');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));