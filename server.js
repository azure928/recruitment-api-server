const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');

const corsOption = {
  origin: '*',
};
const app = express();

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

const PORT = process.env.PORT || 10010;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
