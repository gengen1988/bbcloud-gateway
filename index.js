var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var nconf = require('nconf');

var app = express();

nconf.argv().env();
var NODE_ENV = nconf.get('NODE_ENV') || 'development';
nconf.file({file: 'config.' + NODE_ENV + '.json'});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', require('./routers'));

app.listen(3000, function() {
  console.log('started');
});
