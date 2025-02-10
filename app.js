const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dbtest = require('./config/database');

//koneksi database
dbtest.authenticate()
  .then(() => console.log('DB Connected...'))
  .catch(err => console.log('DB Connection Error: ', err));

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

dbtest.sync().then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.error("Database sync error:", err));