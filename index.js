const express = require('express');
const app = express();
const path = require('path')
const ejs = require('ejs');

const routesApi = require('./routes/api.js');
app.use('/api', routesApi);

const routesWeb = require('./routes/web.js');
app.use('/', routesWeb);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});