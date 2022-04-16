const express = require('express');
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const db = require('./config/connection')

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);



mongoose.set('debug', true)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});