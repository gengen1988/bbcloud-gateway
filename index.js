var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', require('./routers'));

app.listen(3000, function() {
  console.log('started');
});
