require('dotenv').config();
const express = require('express');
const app = express();
const serverConfig = require('./config/serverConfig');
const path = require('path');

const indexRouter = require('./routes/index.routes');

serverConfig(app);

app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
