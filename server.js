const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
require('dotenv').config();

const corsOption = {
  origin: '*',
};
const app = express();

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);
// simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

const PORT = process.env.PORT || 10000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
