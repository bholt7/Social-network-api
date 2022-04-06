const express = require('express');
const { default: mongoose } = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

mongoose.set('debug', true)

app.listen(PORT, ()=>(`Listening on localhost:${PORT}`))