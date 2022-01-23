const express = require('express');
const {engine} = require('express-handlebars');
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

// Middleware for handlebars
app.engine('handlebars', engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

app.get('/', (req, res) => {
    res.send('INDEX');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));